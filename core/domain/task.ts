import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Project } from "./project";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId: string;

  @ManyToOne("Project", "tasks", { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({
    type: "varchar",
    length: 20,
    default: "todo",
  })
  status: TaskStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: "medium",
  })
  priority: TaskPriority;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
