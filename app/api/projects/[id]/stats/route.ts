import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/database/data-source";
import { Task } from "@/core/domain/task";
import { Project } from "@/core/domain/project";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const resolvedParams = await params;
    const projectId = resolvedParams.id;

    const projectRepository = AppDataSource.getRepository(Project);
    const project = await projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const taskRepository = AppDataSource.getRepository(Task);

    // Use GROUP BY for efficient single query instead of 4 separate count queries
    const stats = await taskRepository
      .createQueryBuilder("task")
      .select("task.status", "status")
      .addSelect("COUNT(*)", "count")
      .where("task.projectId = :projectId", { projectId })
      .groupBy("task.status")
      .getRawMany();

    // Build response object from grouped results
    const statusCounts = {
      todo: 0,
      in_progress: 0,
      done: 0,
    };

    for (const row of stats) {
      statusCounts[row.status as keyof typeof statusCounts] = parseInt(row.count, 10);
    }

    const total = statusCounts.todo + statusCounts.in_progress + statusCounts.done;

    return NextResponse.json({
      total,
      todo: statusCounts.todo,
      inProgress: statusCounts.in_progress,
      done: statusCounts.done,
    });
  } catch (error) {
    console.error("Error fetching project stats:", error);
    return NextResponse.json({ error: "Failed to fetch project stats" }, { status: 500 });
  }
}
