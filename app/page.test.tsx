import { beforeEach, describe, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    jest.mocked(global.fetch).mockReset();

    // Default mock: return empty arrays for projects and tasks
    jest.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);
  });

  it("renders a heading", async () => {
    render(<Page />);

    // Wait for async effects to complete
    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});
