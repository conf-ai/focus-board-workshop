"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type SortOption =
  | "newest"
  | "oldest"
  | "priority_high"
  | "priority_low"
  | "status_open"
  | "status_done";

interface TaskSortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "priority_high", label: "Priority: High to Low" },
  { value: "priority_low", label: "Priority: Low to High" },
  { value: "status_open", label: "Status: Open First" },
  { value: "status_done", label: "Status: Done First" },
] as const;

export function TaskSortSelect({ value, onChange }: TaskSortSelectProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue as SortOption);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="sort-select" className="text-sm font-medium">
        Sort by
      </Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id="sort-select" className="w-[180px]" aria-label="Sort tasks">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
