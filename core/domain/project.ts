import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Task } from "./task";

@Entity("projects")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany("Task", "project")
  tasks: Task[];
}
