"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TaskStatus, TaskPriority } from "@/core/domain/task";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onTaskClick?: (taskId: string) => void;
}

const statusColors = {
  todo: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  in_progress: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  done: "bg-green-100 text-green-800 hover:bg-green-200",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const statusLabels = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function TaskItem({ task, onTaskClick }: TaskItemProps) {
  const handleClick = () => {
    onTaskClick?.(task.id);
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        onTaskClick ? "hover:scale-[1.02]" : ""
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium text-sm flex-1 truncate" title={task.title}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="secondary" className={statusColors[task.status]}>
              {statusLabels[task.status]}
            </Badge>
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {priorityLabels[task.priority]}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
