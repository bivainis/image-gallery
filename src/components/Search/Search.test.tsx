import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search from "./Search";
import { server } from "../../mocks/node";

beforeAll(() => {
  server.listen();
});

beforeEach(() => {});

afterEach(() => {
  cleanup();
});

const mockOnSearch = jest.fn();

test("Search input renders", () => {
  render(<Search onSearch={mockOnSearch} />);

  const inputElement = screen.getByPlaceholderText("Search images");

  expect(inputElement).toBeInTheDocument();
});

test("Search input has focus when clicked", async () => {
  render(<Search onSearch={mockOnSearch} />);

  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");

  await user.click(inputElement);

  expect(inputElement).toHaveFocus();
});

test("Search input has value after typing", async () => {
  render(<Search onSearch={mockOnSearch} />);
  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");

  await user.click(inputElement);
  await user.keyboard("hello");

  expect(inputElement).toHaveValue("hello");
});

test("Search input is not cleared after submit", async () => {
  render(<Search onSearch={mockOnSearch} />);

  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");

  await user.click(inputElement);
  await user.keyboard("hello");
  await user.keyboard("{Enter}");

  expect(inputElement).toHaveValue("hello");
});

test("Search input is cleared after clear button is clicked", async () => {
  render(<Search onSearch={mockOnSearch} />);

  const user = userEvent.setup();
  const inputElement = screen.getByPlaceholderText("Search images");
  const clearButtonElement = screen.getByRole("button", {
    name: "Clear search",
  });

  await user.click(inputElement);
  await user.keyboard("hello");
  await user.click(clearButtonElement);

  expect(inputElement).toHaveValue("");
});
