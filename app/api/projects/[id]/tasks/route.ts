import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/database/data-source";
import { Task } from "@/core/domain/task";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const resolvedParams = await params;
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({
      where: { projectId: resolvedParams.id },
      relations: ["project"],
      order: { createdAt: "DESC" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    return NextResponse.json({ error: "Failed to fetch project tasks" }, { status: 500 });
  }
}
