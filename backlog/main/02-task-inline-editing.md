# Main Task: Task Inline Editing

## Business Problem

The PUT API endpoint exists for updating tasks, but there is no user interface to modify existing tasks. Users must delete and recreate tasks to make changes, losing creation timestamps and making task management tedious.

## Impact

- Users cannot correct typos or update task details after creation
- Changing task status or priority requires workarounds
- No way to evolve task information as work progresses
- Task management becomes friction-heavy, discouraging updates

## Success Criteria (Observable Outcomes)

- [ ] Edit button or mode available in the task detail panel
- [ ] Edit mode shows form with current task values pre-filled
- [ ] Users can modify title, status, and priority fields
- [ ] Form validates input (title required, max length)
- [ ] Save action calls PUT /api/tasks/[id] and updates UI optimistically
- [ ] Cancel action discards changes and returns to view mode
- [ ] Success/error feedback via toast notifications
- [ ] Loading state shown during API call

## Real-World Context

This feature teaches form state management, optimistic UI updates, edit/view mode toggling, and integrating with existing REST endpoints for updates.
