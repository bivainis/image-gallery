import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
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
  expect(list).toBeInTheDocument();

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

test("Clicking next should load the next page of images", async () => {
  const user = userEvent.setup();
  render(<GalleryPage />);

  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading, please wait...")
  );

  const nextButton = await screen.findByLabelText("Next page");

  // @TODO: refactor multiple clicks to by more DRY
  await user.click(nextButton);

  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading, please wait...")
  );

  await user.click(nextButton);

  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading, please wait...")
  );

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

  // wait for loading text to be removed
  await screen.findByText("Loading, please wait...");
  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading, please wait...")
  );

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
  await screen.findByRole("list");
  await user.click(inputElement);
  await user.keyboard("hello{Enter}");

  await screen.findByText("Loading, please wait...");
  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading, please wait...")
  );

  await user.click(clearButtonElement);

  await screen.findByText("Loading, please wait...");

  await waitForElementToBeRemoved(() =>
    screen.queryByText("Loading, please wait...")
  );
  const list = await screen.findByRole("list");

  const { findAllByRole } = within(list);
  const items = await findAllByRole("listitem");
  const [firstItem] = items;

  expect(items.length).toBe(6);
  expect(firstItem).toHaveTextContent("Level up");
});
