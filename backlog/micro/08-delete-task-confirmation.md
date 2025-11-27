# Micro Task: Delete Task Confirmation

## Business Problem

The DELETE API endpoint exists but there's no UI way to delete tasks. Users who create tasks by mistake or need to clean up old tasks have no way to remove them from the system.

## Impact

- Users cannot remove unwanted or mistaken tasks
- Project lists become cluttered with obsolete items
- No cleanup mechanism leads to data bloat
- Users feel stuck with incorrect entries

## Success Criteria (Observable Outcomes)

- [ ] Delete button or action is accessible from task list or detail view
- [ ] Confirmation dialog prevents accidental deletions
- [ ] Successful deletion shows feedback (toast notification)
- [ ] Deleted task immediately disappears from the list
- [ ] Error states are handled gracefully (task already deleted, network error)

## Real-World Context

Destructive actions require careful UX consideration. This task demonstrates how to implement delete functionality with appropriate safeguards and feedback.
