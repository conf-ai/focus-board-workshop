# Tasks: Project Stats Endpoint

## Business Context

- **User Problem**: Users currently experience slow page loads because the UI must fetch all task data just to display simple task counts. For projects with many tasks, this creates unnecessary delays and bandwidth waste.
- **User Impact**: Faster page loads, reduced data transfer, and more responsive UI when viewing project dashboards. This is a performance optimization that improves user experience without changing functionality.

## Discovered Patterns

### API Route Structure
- **Location**: `app/api/projects/[id]/tasks/route.ts` - existing pattern for project-scoped endpoints
- **Dynamic route params**: Uses `{ params }: { params: Promise<{ id: string }> }` pattern (Next.js 16)
- **DataSource initialization**: Check `AppDataSource.isInitialized` before initializing
- **Repository access**: `AppDataSource.getRepository(Entity)` for TypeORM operations
- **Response format**: `NextResponse.json(data)` for success, `NextResponse.json({ error: "..." }, { status: xxx })` for errors

### Error Handling Pattern
- **404 Response**: `{ error: "Task not found" }` with status 404 (see `app/api/tasks/[id]/route.ts` line 26)
- **500 Response**: `{ error: "Failed to fetch ..." }` with status 500 for unexpected errors
- **Console logging**: `console.error("Error description:", error)` before returning 500

### Domain Model
- **Task entity**: `core/domain/task.ts` - has `status` field with type `TaskStatus = "todo" | "in_progress" | "done"`
- **Project entity**: `core/domain/project.ts` - has `id` (UUID) for lookup
- **Relationship**: Tasks have `projectId` foreign key to Project

### Database
- **DataSource**: Import from `@/database/data-source`
- **Entity import**: Import from `@/core/domain/task` and `@/core/domain/project`

## Implementation Tasks

### Task 1: Create stats endpoint route handler COMPLETED

**What**: Create new API endpoint at `GET /api/projects/[id]/stats` that returns task counts grouped by status. The endpoint should verify the project exists (return 404 if not), then use TypeORM's count functionality to efficiently count tasks by status without loading full task data.

**Files**:
- Create `app/api/projects/[id]/stats/route.ts`

**Pattern**: Follow the structure in `app/api/projects/[id]/tasks/route.ts`:
- Same dynamic params handling: `{ params }: { params: Promise<{ id: string }> }`
- Same DataSource initialization pattern
- Same error handling (404 for not found, 500 for errors)

**Acceptance**:
- Endpoint responds to GET requests at `/api/projects/[id]/stats`
- Returns JSON: `{ total: number, todo: number, inProgress: number, done: number }`
- Returns 404 with `{ error: "Project not found" }` for invalid project IDs
- Returns 500 with `{ error: "Failed to fetch project stats" }` for unexpected errors
- Uses TypeORM count queries (not loading full task entities)

**Implementation**:
- **Files Modified**: Created `app/api/projects/[id]/stats/route.ts`
- **Evidence**: Endpoint created following exact patterns from tasks route handler. Used GROUP BY optimization for single database query instead of 4 separate count queries.
- **Quality**: Lint pass | TypeScript pass

### Task 2: Verify endpoint with manual testing COMPLETED

**What**: Test the endpoint manually to verify all success criteria are met. This includes testing with valid project IDs, invalid project IDs, and checking response performance.

**Files**:
- No files to modify (verification only)

**Pattern**: Use curl or similar HTTP client to test:
```bash
# Test with valid project ID
curl http://localhost:3000/api/projects/{valid-id}/stats

# Test with invalid project ID
curl http://localhost:3000/api/projects/invalid-uuid/stats
```

**Acceptance**:
- Valid project returns 200 with stats object
- Invalid project returns 404 with error message
- Response time is faster than fetching all tasks (no full task data loaded)

**Implementation**:
- **Tests Executed**:
  - Valid project ID: `curl http://localhost:3000/api/projects/550e8400-e29b-41d4-a716-446655440001/stats` returned `{"total":7,"todo":3,"inProgress":3,"done":1}`
  - Second project: `curl http://localhost:3000/api/projects/550e8400-e29b-41d4-a716-446655440002/stats` returned `{"total":6,"todo":3,"inProgress":2,"done":1}`
  - Non-existent UUID: `curl http://localhost:3000/api/projects/00000000-0000-0000-0000-000000000000/stats` returned `{"error":"Project not found"}`
- **Evidence**: All acceptance criteria verified - correct JSON structure, proper 404 handling, efficient COUNT query used

## Handoff Notes

**Key Implementation Details**:
1. The new endpoint directory structure should be: `app/api/projects/[id]/stats/route.ts` (creates a sibling to the existing `tasks` folder)
2. Use `taskRepository.count({ where: { projectId, status } })` for efficient counting - TypeORM will generate `SELECT COUNT(*)` queries
3. Project existence check: Query the Project repository first with `findOne({ where: { id } })` before counting tasks
4. The `inProgress` key in the response should be camelCase to match typical API conventions, even though the database status value is `in_progress`

**TypeORM Count Pattern**:
```typescript
const total = await taskRepository.count({ where: { projectId } });
const todo = await taskRepository.count({ where: { projectId, status: "todo" } });
// etc.
```

**Alternative Optimization**: For better performance, consider using a single query with GROUP BY:
```typescript
const stats = await taskRepository
  .createQueryBuilder("task")
  .select("task.status", "status")
  .addSelect("COUNT(*)", "count")
  .where("task.projectId = :projectId", { projectId })
  .groupBy("task.status")
  .getRawMany();
```
This reduces database round trips from 4 to 1, but requires post-processing to build the response object. Either approach is acceptable.

---

## Implementation Summary (Coder Agent)

**Design Principles Applied**:

- **YAGNI**: Did not add pagination, filtering, or caching - only what was needed for task counts
- **DRY**: Reused exact patterns from `app/api/projects/[id]/tasks/route.ts` for DataSource initialization, params handling, error responses
- **SRP**: Single endpoint with single purpose - return task counts by status for a project
- **SoC**: API layer handles HTTP concerns, TypeORM handles database concerns, clean separation maintained

**Quality Verification**: Lint pass | TypeScript pass | Integration pass

**Business Value**: Users can now fetch task counts with a single efficient database query instead of loading all task data. Response format `{"total":7,"todo":3,"inProgress":3,"done":1}` provides exactly what UI dashboards need for display.

**Ready for Tester**:
- Test endpoint at `GET /api/projects/{id}/stats`
- Verify counts match actual tasks in database
- Verify 404 response for non-existent projects
- Verify response time is fast (single COUNT query)
