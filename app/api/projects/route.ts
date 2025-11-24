import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/database/data-source";
import { Project } from "@/core/domain/project";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
});

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const projectRepository = AppDataSource.getRepository(Project);
    const projects = await projectRepository.find({
      order: { createdAt: "DESC" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createProjectSchema.parse(body);

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const projectRepository = AppDataSource.getRepository(Project);
    const project = projectRepository.create(validatedData);
    const savedProject = await projectRepository.save(project);

    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
