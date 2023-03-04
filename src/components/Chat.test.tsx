import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Chat from "./Chat";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("renders chat input", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(<App />);
  const input = screen.getByPlaceholderText(
    "Ask OpenAI here..."
  ) as HTMLInputElement;
  expect(input).toBeInTheDocument();
  userEvent.type(input, "test message");
  expect(input.value).toBe("test message");
});
