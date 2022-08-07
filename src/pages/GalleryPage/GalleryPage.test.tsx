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
