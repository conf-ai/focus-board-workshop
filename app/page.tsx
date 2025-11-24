"use client";

import * as React from "react";
import { ProjectSwitcher } from "@/components/features/ProjectSwitcher";
import { TaskList } from "@/components/features/TaskList";
import { TaskSearch } from "@/components/features/TaskSearch";
import { TaskFilters } from "@/components/features/TaskFilters";
import { TaskForm } from "@/components/features/TaskForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { TaskStatus, TaskPriority } from "@/core/domain/task";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  createdAt: Date;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  project?: Project;
}

interface TaskFilters {
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
}

export default function TaskManagement() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = React.useState<Task[]>([]);
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<TaskFilters>({ status: "all", priority: "all" });
  const [loading, setLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Fetch projects on mount
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
          if (data.length > 0) {
            setSelectedProjectId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      }
    };
    fetchProjects();
  }, []);

  // Fetch tasks when project changes
  React.useEffect(() => {
    if (!selectedProjectId) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${selectedProjectId}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedProjectId]);

  // Filter and search tasks
  React.useEffect(() => {
    let filtered = tasks;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    // Priority filter
    if (filters.priority && filters.priority !== "all") {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filters]);

  const handleCreateTask = async (taskData: {
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    projectId: string;
  }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [newTask, ...prev]);
        setIsDialogOpen(false);
        toast.success("Task created successfully");
      } else {
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const handleTaskClick = (taskId: string) => {
    // Task click handler - could open edit dialog or navigate to task detail
    console.log("Task clicked:", taskId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FocusBoard</h1>
              <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <TaskForm
                  projectId={selectedProjectId}
                  onSubmit={handleCreateTask}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Project Selection and Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project & Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <ProjectSwitcher
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onProjectChange={setSelectedProjectId}
                  />
                </div>
                <div className="flex-1">
                  <TaskSearch value={searchQuery} onChange={setSearchQuery} />
                </div>
                <TaskFilters filters={filters} onFiltersChange={setFilters} />
              </div>
            </CardContent>
          </Card>

          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tasks ({filteredTasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={filteredTasks}
                onTaskClick={handleTaskClick}
                loading={loading}
                emptyMessage="No tasks found. Create your first task to get started!"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
