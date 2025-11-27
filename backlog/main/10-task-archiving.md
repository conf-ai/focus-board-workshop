# Main Task: Task Archiving

## Business Problem

Completed tasks remain in the list indefinitely, cluttering the view and making it harder to focus on active work. Users need a way to hide finished tasks while preserving them for reference, without permanently deleting task history.

## Impact

- Completed tasks clutter the active task list
- Users lose focus scrolling past done items
- No distinction between "done" and "archived/closed"
- Task history is lost if users delete completed tasks
- List performance degrades with many completed tasks

## Success Criteria (Observable Outcomes)

- [ ] Task entity has `isArchived` boolean field (default: false)
- [ ] Database migration adds isArchived column
- [ ] API accepts isArchived in PUT requests
- [ ] GET /api/projects/[id]/tasks supports `archived` query parameter
- [ ] Archive button visible on completed tasks (or in detail panel)
- [ ] "Show Archived" toggle in filter area
- [ ] Archived tasks display with distinct visual style (muted, strikethrough)
- [ ] Archived tasks can be unarchived (restored to active)
- [ ] Default view hides archived tasks

## Real-World Context

This feature teaches soft-delete patterns, conditional filtering, boolean field handling, and toggle-based view customization.
