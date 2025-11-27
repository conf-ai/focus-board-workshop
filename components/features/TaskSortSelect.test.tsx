import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskSortSelect, SortOption } from "./TaskSortSelect";

describe("TaskSortSelect", () => {
  const defaultProps = {
    value: "newest" as SortOption,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("displays 'Sort by' label", () => {
      render(<TaskSortSelect {...defaultProps} />);

      expect(screen.getByText("Sort by")).toBeInTheDocument();
    });

    it("displays the currently selected sort option", () => {
      render(<TaskSortSelect {...defaultProps} value="priority_high" />);

      expect(screen.getByRole("combobox")).toHaveTextContent("Priority: High to Low");
    });

    it("has proper accessibility label for screen readers", () => {
      render(<TaskSortSelect {...defaultProps} />);

      expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "Sort tasks");
    });
  });

  describe("user interactions", () => {
    it("opens dropdown and shows all 6 sort options when clicked", async () => {
      const user = userEvent.setup();
      render(<TaskSortSelect {...defaultProps} />);

      await user.click(screen.getByRole("combobox"));

      expect(screen.getByRole("option", { name: "Newest First" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Oldest First" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Priority: High to Low" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Priority: Low to High" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Status: Open First" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Status: Done First" })).toBeInTheDocument();
    });

    it("calls onChange with 'oldest' when 'Oldest First' option is selected", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<TaskSortSelect value="newest" onChange={onChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Oldest First" }));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith("oldest");
    });

    it("calls onChange with 'priority_high' when 'Priority: High to Low' is selected", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<TaskSortSelect value="newest" onChange={onChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Priority: High to Low" }));

      expect(onChange).toHaveBeenCalledWith("priority_high");
    });

    it("calls onChange with 'priority_low' when 'Priority: Low to High' is selected", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<TaskSortSelect value="newest" onChange={onChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Priority: Low to High" }));

      expect(onChange).toHaveBeenCalledWith("priority_low");
    });

    it("calls onChange with 'status_open' when 'Status: Open First' is selected", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<TaskSortSelect value="newest" onChange={onChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Status: Open First" }));

      expect(onChange).toHaveBeenCalledWith("status_open");
    });

    it("calls onChange with 'status_done' when 'Status: Done First' is selected", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<TaskSortSelect value="newest" onChange={onChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Status: Done First" }));

      expect(onChange).toHaveBeenCalledWith("status_done");
    });
  });

  describe("controlled component behavior", () => {
    it("updates displayed value when prop value changes", () => {
      const { rerender } = render(<TaskSortSelect {...defaultProps} value="newest" />);

      expect(screen.getByRole("combobox")).toHaveTextContent("Newest First");

      rerender(<TaskSortSelect {...defaultProps} value="status_done" />);

      expect(screen.getByRole("combobox")).toHaveTextContent("Status: Done First");
    });
  });
});
