# Main Task: Task Quick Status Toggle

## Business Problem

Changing a task's status currently requires opening the detail panel and entering edit mode - too many clicks for a common action. Users need a faster way to mark tasks as in-progress or done without leaving the list view.

## Impact

- Common workflow action requires too many steps
- List-based task management feels slow
- Users avoid updating status due to friction
- Task statuses become stale and unreliable
- Quick status updates during standup meetings are tedious

## Success Criteria (Observable Outcomes)

- [ ] Task item shows inline status control (button, dropdown, or checkbox)
- [ ] Single click changes status (e.g., todo → in_progress → done cycle)
- [ ] Status change calls PUT /api/tasks/[id] with new status
- [ ] UI updates optimistically before API response
- [ ] Loading indicator during API call (subtle, non-blocking)
- [ ] Error handling reverts status if API fails
- [ ] Visual feedback confirms status change (badge update, animation)
- [ ] Works on mobile with appropriate touch targets

## Real-World Context

This feature teaches inline interaction patterns, optimistic UI updates with rollback, and micro-interaction design for common CRUD operations.
