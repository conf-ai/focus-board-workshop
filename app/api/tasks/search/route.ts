import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/database/data-source";
import { Task } from "@/core/domain/task";
import { Like } from "typeorm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({
      where: {
        title: Like(`%${query}%`),
      },
      relations: ["project"],
      order: { createdAt: "DESC" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error searching tasks:", error);
    return NextResponse.json({ error: "Failed to search tasks" }, { status: 500 });
  }
}
