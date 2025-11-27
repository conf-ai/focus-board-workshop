# Micro Task: Project Stats Endpoint

## Business Problem

The UI displays a task count, but it currently requires loading all tasks just to count them. For projects with hundreds of tasks, this creates unnecessary network overhead and slow initial page loads.

## Impact

- Page load times increase as project task count grows
- Bandwidth is wasted transferring full task data just for counts
- Users see loading spinners longer than necessary
- Server resources are used inefficiently for simple count queries

## Success Criteria (Observable Outcomes)

- [ ] New endpoint `GET /api/projects/[id]/stats` exists
- [ ] Endpoint returns `{ total, todo, inProgress, done }` counts
- [ ] Response is fast (no full task data loaded)
- [ ] Endpoint handles invalid project IDs with proper 404 response
- [ ] Endpoint follows existing API patterns (error handling, response format)

## Real-World Context

Dedicated stats endpoints are a common API optimization pattern. This task shows how separating data concerns improves performance without changing existing functionality.
