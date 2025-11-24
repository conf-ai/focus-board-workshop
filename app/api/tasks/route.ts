import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/database/data-source";
import { Task } from "@/core/domain/task";
import { z } from "zod";

const createTaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(1).max(255),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({
      relations: ["project"],
      order: { createdAt: "DESC" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createTaskSchema.parse(body);

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const taskRepository = AppDataSource.getRepository(Task);
    const task = taskRepository.create(validatedData);
    const savedTask = await taskRepository.save(task);

    return NextResponse.json(savedTask, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
