import { beforeEach, describe, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "../app/page";

// Test data factory for creating mock tasks
function createMockTask(
  overrides: Partial<{
    id: string;
    projectId: string;
    title: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    createdAt: string;
  }> = {}
) {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    projectId: overrides.projectId ?? "project-1",
    title: overrides.title ?? "Test Task",
    status: overrides.status ?? "todo",
    priority: overrides.priority ?? "medium",
    createdAt: overrides.createdAt ?? new Date().toISOString(),
  };
}

// Test data factory for creating mock projects
function createMockProject(
  overrides: Partial<{
    id: string;
    name: string;
    createdAt: string;
  }> = {}
) {
  return {
    id: overrides.id ?? "project-1",
    name: overrides.name ?? "Test Project",
    createdAt: overrides.createdAt ?? new Date().toISOString(),
  };
}

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

  describe("Sort Controls", () => {
    it("displays sort dropdown with 'Sort by' label in Project & Filters card", async () => {
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("Project & Filters")).toBeInTheDocument();
      });

      // Sort by label should be present on the page
      expect(screen.getByText("Sort by")).toBeInTheDocument();

      // Sort dropdown should be accessible
      expect(screen.getByRole("combobox", { name: "Sort tasks" })).toBeInTheDocument();
    });

    it("shows all 6 sort options when dropdown is clicked", async () => {
      const user = userEvent.setup();
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByRole("combobox", { name: "Sort tasks" })).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);

      expect(screen.getByRole("option", { name: "Newest First" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Oldest First" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Priority: High to Low" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Priority: Low to High" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Status: Open First" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Status: Done First" })).toBeInTheDocument();
    });

    it("defaults to 'Newest First' sort option", async () => {
      render(<Page />);

      await waitFor(() => {
        const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
        expect(sortDropdown).toHaveTextContent("Newest First");
      });
    });
  });

  describe("Sorting Behavior", () => {
    const mockProject = createMockProject({ id: "project-1", name: "Test Project" });

    const mockTasksWithDifferentDates = [
      createMockTask({ id: "task-old", title: "Old Task", createdAt: "2024-01-01T10:00:00Z" }),
      createMockTask({ id: "task-new", title: "New Task", createdAt: "2024-06-01T10:00:00Z" }),
      createMockTask({
        id: "task-middle",
        title: "Middle Task",
        createdAt: "2024-03-01T10:00:00Z",
      }),
    ];

    const mockTasksWithDifferentPriorities = [
      createMockTask({ id: "task-low", title: "Low Priority Task", priority: "low" }),
      createMockTask({ id: "task-high", title: "High Priority Task", priority: "high" }),
      createMockTask({ id: "task-medium", title: "Medium Priority Task", priority: "medium" }),
    ];

    const mockTasksWithDifferentStatuses = [
      createMockTask({ id: "task-done", title: "Done Task", status: "done" }),
      createMockTask({ id: "task-todo", title: "Todo Task", status: "todo" }),
      createMockTask({ id: "task-progress", title: "In Progress Task", status: "in_progress" }),
    ];

    // Helper to get task titles in order from the task list
    function getTaskTitlesInOrder(): string[] {
      const taskList = screen.getByRole("list", { name: "Task list" });
      const headings = within(taskList).getAllByRole("heading", { level: 3 });
      return headings.map((h) => h.textContent || "");
    }

    it("sorts tasks by newest first by default", async () => {
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        // Task endpoint: /api/projects/[id]/tasks
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentDates } as Response;
        }
        // Projects endpoint: /api/projects
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      // Wait for task list to load (checking for task list role to ensure tasks rendered)
      await waitFor(() => {
        expect(screen.getByRole("list", { name: "Task list" })).toBeInTheDocument();
      });

      const titles = getTaskTitlesInOrder();
      // Newest first: New Task, Middle Task, Old Task
      expect(titles).toEqual(["New Task", "Middle Task", "Old Task"]);
    });

    it("reorders tasks by oldest first when 'Oldest First' is selected", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentDates } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("New Task")).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Oldest First" }));

      await waitFor(() => {
        const titles = getTaskTitlesInOrder();
        // Oldest first: Old Task, Middle Task, New Task
        expect(titles).toEqual(["Old Task", "Middle Task", "New Task"]);
      });
    });

    it("reorders tasks by priority high to low when 'Priority: High to Low' is selected", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentPriorities } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("Low Priority Task")).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Priority: High to Low" }));

      await waitFor(() => {
        const titles = getTaskTitlesInOrder();
        // High to Low: High, Medium, Low
        expect(titles).toEqual(["High Priority Task", "Medium Priority Task", "Low Priority Task"]);
      });
    });

    it("reorders tasks by priority low to high when 'Priority: Low to High' is selected", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentPriorities } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("Low Priority Task")).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Priority: Low to High" }));

      await waitFor(() => {
        const titles = getTaskTitlesInOrder();
        // Low to High: Low, Medium, High
        expect(titles).toEqual(["Low Priority Task", "Medium Priority Task", "High Priority Task"]);
      });
    });

    it("reorders tasks by status open first when 'Status: Open First' is selected", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentStatuses } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("Todo Task")).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Status: Open First" }));

      await waitFor(() => {
        const titles = getTaskTitlesInOrder();
        // Open first (todo=1, in_progress=2, done=3): Todo, In Progress, Done
        expect(titles).toEqual(["Todo Task", "In Progress Task", "Done Task"]);
      });
    });

    it("reorders tasks by status done first when 'Status: Done First' is selected", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentStatuses } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("Todo Task")).toBeInTheDocument();
      });

      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Status: Done First" }));

      await waitFor(() => {
        const titles = getTaskTitlesInOrder();
        // Done first (done=3, in_progress=2, todo=1): Done, In Progress, Todo
        expect(titles).toEqual(["Done Task", "In Progress Task", "Todo Task"]);
      });
    });

    it("updates task order immediately without page reload when sort option changes", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksWithDifferentDates } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      // Wait for task list to load
      await waitFor(() => {
        expect(screen.getByRole("list", { name: "Task list" })).toBeInTheDocument();
      });

      // Verify initial order (newest first by default)
      let titles = getTaskTitlesInOrder();
      expect(titles[0]).toBe("New Task");

      // Change sort option
      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Oldest First" }));

      // Verify order changed immediately (client-side sorting)
      await waitFor(() => {
        titles = getTaskTitlesInOrder();
        expect(titles[0]).toBe("Old Task");
        expect(titles[2]).toBe("New Task");
      });
    });
  });

  describe("Sorting with Filters", () => {
    const mockProject = createMockProject({ id: "project-1", name: "Test Project" });

    const mockTasksForFilterSort = [
      createMockTask({
        id: "task-1",
        title: "High Priority New",
        priority: "high",
        status: "todo",
        createdAt: "2024-06-01T10:00:00Z",
      }),
      createMockTask({
        id: "task-2",
        title: "High Priority Old",
        priority: "high",
        status: "done",
        createdAt: "2024-01-01T10:00:00Z",
      }),
      createMockTask({
        id: "task-3",
        title: "Low Priority Task",
        priority: "low",
        status: "todo",
        createdAt: "2024-03-01T10:00:00Z",
      }),
    ];

    // Helper to get task titles in order from the task list
    function getTaskTitlesInOrder(): string[] {
      const taskList = screen.getByRole("list", { name: "Task list" });
      const headings = within(taskList).getAllByRole("heading", { level: 3 });
      return headings.map((h) => h.textContent || "");
    }

    it("sorts correctly after filtering by status", async () => {
      const user = userEvent.setup();
      jest.mocked(global.fetch).mockImplementation(async (url) => {
        const urlStr = String(url);
        if (urlStr.match(/\/api\/projects\/[^/]+\/tasks/)) {
          return { ok: true, json: async () => mockTasksForFilterSort } as Response;
        }
        if (urlStr.includes("/api/projects")) {
          return { ok: true, json: async () => [mockProject] } as Response;
        }
        return { ok: true, json: async () => [] } as Response;
      });

      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("High Priority New")).toBeInTheDocument();
      });

      // Filter by "To Do" status
      const statusDropdown = screen.getByRole("combobox", { name: "Filter by status" });
      await user.click(statusDropdown);
      await user.click(screen.getByRole("option", { name: "To Do" }));

      // Wait for filter to apply - should only show todo tasks
      await waitFor(() => {
        expect(screen.queryByText("High Priority Old")).not.toBeInTheDocument();
      });

      // Sort by priority high to low
      const sortDropdown = screen.getByRole("combobox", { name: "Sort tasks" });
      await user.click(sortDropdown);
      await user.click(screen.getByRole("option", { name: "Priority: High to Low" }));

      // Verify filtered and sorted results
      await waitFor(() => {
        const titles = getTaskTitlesInOrder();
        // Only todo tasks, sorted by priority: High Priority New, Low Priority Task
        expect(titles).toEqual(["High Priority New", "Low Priority Task"]);
      });
    });
  });
});
