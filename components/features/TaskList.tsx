"use client";

import * as React from "react";
import { TaskItem } from "./TaskItem";
import { TaskStatus, TaskPriority } from "@/core/domain/task";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  project?: {
    id: string;
    name: string;
  };
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function TaskList({
  tasks,
  onTaskClick,
  loading = false,
  emptyMessage = "No tasks found",
}: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-16 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskClick={onTaskClick} />
      ))}
    </div>
  );
}
