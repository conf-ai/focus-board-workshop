import { NextRequest } from "next/server";
import { GET } from "./route";
import { Project } from "@/core/domain/project";
import { Task } from "@/core/domain/task";

// Mock the AppDataSource
jest.mock("@/database/data-source", () => ({
  AppDataSource: {
    isInitialized: true,
    initialize: jest.fn().mockResolvedValue(undefined),
    getRepository: jest.fn(),
  },
}));

// Import the mocked module
import { AppDataSource } from "@/database/data-source";

describe("GET /api/projects/[id]/stats", () => {
  // Mock query builder chain for task repository
  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn(),
  };

  const mockProjectRepository = {
    findOne: jest.fn(),
  };

  const mockTaskRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup getRepository mock with entity class comparison
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === Project) {
        return mockProjectRepository;
      }
      if (entity === Task) {
        return mockTaskRepository;
      }
      throw new Error(`Unexpected entity: ${entity}`);
    });
  });

  function createMockRequest(url: string): NextRequest {
    return new NextRequest(new URL(url, "http://localhost"));
  }

  describe("when project exists with tasks", () => {
    it("returns correct counts for project with tasks in all statuses", async () => {
      // Arrange: Setup mock to return a valid project
      mockProjectRepository.findOne.mockResolvedValue({
        id: "project-123",
        name: "Test Project",
      });

      // Setup mock to return grouped task counts
      mockQueryBuilder.getRawMany.mockResolvedValue([
        { status: "todo", count: "5" },
        { status: "in_progress", count: "3" },
        { status: "done", count: "10" },
      ]);

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/project-123/stats"),
        {
          params: Promise.resolve({ id: "project-123" }),
        }
      );

      // Assert
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toEqual({
        total: 18,
        todo: 5,
        inProgress: 3,
        done: 10,
      });
    });

    it("returns all zeros for project with no tasks", async () => {
      // Arrange: Empty project
      mockProjectRepository.findOne.mockResolvedValue({
        id: "empty-project",
        name: "Empty Project",
      });
      mockQueryBuilder.getRawMany.mockResolvedValue([]);

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/empty-project/stats"),
        {
          params: Promise.resolve({ id: "empty-project" }),
        }
      );

      // Assert
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toEqual({
        total: 0,
        todo: 0,
        inProgress: 0,
        done: 0,
      });
    });

    it("handles project with tasks only in some statuses", async () => {
      // Arrange: Project with only todo and done tasks (no in_progress)
      mockProjectRepository.findOne.mockResolvedValue({
        id: "partial-project",
        name: "Partial Project",
      });
      mockQueryBuilder.getRawMany.mockResolvedValue([
        { status: "todo", count: "7" },
        { status: "done", count: "2" },
      ]);

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/partial-project/stats"),
        {
          params: Promise.resolve({ id: "partial-project" }),
        }
      );

      // Assert
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toEqual({
        total: 9,
        todo: 7,
        inProgress: 0,
        done: 2,
      });
    });
  });

  describe("when project does not exist", () => {
    it("returns 404 with error message for non-existent project", async () => {
      // Arrange: Project not found
      mockProjectRepository.findOne.mockResolvedValue(null);

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/non-existent-id/stats"),
        {
          params: Promise.resolve({ id: "non-existent-id" }),
        }
      );

      // Assert
      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data).toEqual({ error: "Project not found" });
    });
  });

  describe("error handling", () => {
    it("returns 500 when database query fails", async () => {
      // Arrange: Database error
      mockProjectRepository.findOne.mockRejectedValue(new Error("Database connection failed"));

      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/project-123/stats"),
        {
          params: Promise.resolve({ id: "project-123" }),
        }
      );

      // Assert
      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data).toEqual({ error: "Failed to fetch project stats" });

      consoleSpy.mockRestore();
    });
  });

  describe("response format validation", () => {
    it("returns response with correct JSON content type", async () => {
      // Arrange
      mockProjectRepository.findOne.mockResolvedValue({ id: "project-123", name: "Test" });
      mockQueryBuilder.getRawMany.mockResolvedValue([]);

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/project-123/stats"),
        {
          params: Promise.resolve({ id: "project-123" }),
        }
      );

      // Assert
      expect(response.headers.get("content-type")).toContain("application/json");
    });

    it("returns all required fields in response", async () => {
      // Arrange
      mockProjectRepository.findOne.mockResolvedValue({ id: "project-123", name: "Test" });
      mockQueryBuilder.getRawMany.mockResolvedValue([{ status: "todo", count: "1" }]);

      // Act
      const response = await GET(
        createMockRequest("http://localhost/api/projects/project-123/stats"),
        {
          params: Promise.resolve({ id: "project-123" }),
        }
      );
      const data = await response.json();

      // Assert: All four required fields are present with correct types
      expect(data).toHaveProperty("total");
      expect(data).toHaveProperty("todo");
      expect(data).toHaveProperty("inProgress");
      expect(data).toHaveProperty("done");
      expect(typeof data.total).toBe("number");
      expect(typeof data.todo).toBe("number");
      expect(typeof data.inProgress).toBe("number");
      expect(typeof data.done).toBe("number");
    });
  });
});
