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
