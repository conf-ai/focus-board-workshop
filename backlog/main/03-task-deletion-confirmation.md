# Main Task: Task Deletion with Confirmation

## Business Problem

The DELETE API endpoint exists but there is no UI to delete tasks. Users cannot remove completed or obsolete tasks, causing list clutter. Additionally, accidental deletion could cause data loss without a confirmation step.

## Impact

- Task lists grow indefinitely with no cleanup mechanism
- Obsolete tasks clutter the view and reduce focus
- No protection against accidental deletion of important tasks
- Incomplete CRUD experience frustrates users expecting full task management

## Success Criteria (Observable Outcomes)

- [ ] Delete button visible in task detail panel or task item
- [ ] Clicking delete opens a confirmation dialog (AlertDialog)
- [ ] Dialog clearly states the destructive nature of the action
- [ ] Cancel button closes dialog without action
- [ ] Confirm button calls DELETE /api/tasks/[id]
- [ ] Success toast confirms deletion
- [ ] Task is removed from list immediately (optimistic or after response)
- [ ] Error handling shows failure toast if deletion fails

## Real-World Context

This feature teaches destructive action patterns, confirmation dialogs using shadcn AlertDialog, and proper UX for irreversible operations.
