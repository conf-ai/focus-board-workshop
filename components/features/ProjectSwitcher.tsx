"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  createdAt: Date;
}

interface ProjectSwitcherProps {
  projects: Project[];
  selectedProjectId?: string;
  onProjectChange: (projectId: string) => void;
}

export function ProjectSwitcher({
  projects,
  selectedProjectId,
  onProjectChange,
}: ProjectSwitcherProps) {
  return (
    <Select value={selectedProjectId} onValueChange={onProjectChange}>
      <SelectTrigger className="w-[250px]" aria-label="Select project">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
