import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GalleryPage from "./GalleryPage";
import { server } from "../../mocks/node";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
});

test("Renders image list on initial page load", async () => {
  render(<GalleryPage />);

  const list = await screen.findByRole("list");
  const { getAllByRole } = within(list);
  const items = getAllByRole("listitem");

  expect(items.length).toBe(6);
});

test("Previous button is disabled on initial page load", async () => {
  render(<GalleryPage />);

  const previousButton = await screen.findByRole("button", {
    name: "Previous page",
  });

  expect(previousButton).toBeDisabled();
});

test("Clicking next 3 times should load the next page of images with 2 results", async () => {
  render(<GalleryPage />);

  const user = userEvent.setup();
  const nextButton = await screen.findByLabelText("Next page");

  // wait for list
  await screen.findByRole("list");

  // click 1
  await user.click(nextButton);
  await screen.findByRole("list");

  // click 2
  await user.click(nextButton);
  await screen.findByRole("list");

  // click 3
  await user.click(nextButton);

  const previousButton = await screen.findByRole("button", {
    name: "Previous page",
  });

  const list = await screen.findByRole("list");
  const { getAllByRole } = within(list);
  const items = getAllByRole("listitem");
  const [firstItem] = items;
  const { getByAltText } = within(firstItem);

  expect(items.length).toBe(2);
  expect(getByAltText("Yes")).toBeInTheDocument();
  expect(previousButton).not.toBeDisabled();
  expect(nextButton).toBeDisabled();
});

test("Search should display results correctly", async () => {
  render(<GalleryPage />);

  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");

  // wait for images to load
  await screen.findByRole("list");

  // focus and search for 'hello'
  await user.click(inputElement);
  await user.keyboard("hello{Enter}");

  // wait for the new results list and items
  const list = await screen.findByRole("list");
  const { findAllByRole } = within(list);
  const items = await findAllByRole("listitem");

  // expecting only one result for the mock results
  expect(items.length).toBe(1);
  expect(items[0]).toHaveTextContent("Hello");
});

test("Clearing search should reset results to the first page", async () => {
  render(<GalleryPage />);

  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");
  const clearButtonElement = screen.getByRole("button", {
    name: "Clear search",
  });

  await screen.findByRole("list"); // wait for list
  await user.click(inputElement); // focus input
  await user.keyboard("hello{Enter}"); // type query and hit Enter
  await screen.findByRole("list"); // wait for updated list
  await user.click(clearButtonElement); // click Clear button

  const list = await screen.findByRole("list");
  const { findAllByRole } = within(list);
  const items = await findAllByRole("listitem");
  const [firstItem] = items;

  expect(items.length).toBe(6);
  expect(firstItem).toHaveTextContent("Level up");
});

test("Displays empty results message if search returns no results", async () => {
  render(<GalleryPage />);

  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");

  await screen.findByRole("list"); // wait for list
  await user.click(inputElement); // focus input
  await user.keyboard("asdf{Enter}"); // type query and hit Enter

  await screen.findByRole("list"); // wait for list

  expect(
    screen.getByText("There are no results matching your search")
  ).toBeInTheDocument();
});
