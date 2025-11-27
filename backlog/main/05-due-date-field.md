# Main Task: Due Date Field

## Business Problem

Tasks have no deadline tracking capability. Users cannot set due dates, making it impossible to prioritize by urgency, identify overdue work, or plan ahead. This limits FocusBoard to simple todo lists without time-based organization.

## Impact

- No visibility into task urgency or deadlines
- Cannot sort or filter by due date
- Overdue tasks are not visually distinguished
- Time-sensitive work management is not supported
- Users must track deadlines externally

## Success Criteria (Observable Outcomes)

- [ ] Task entity has optional `dueDate` field (nullable timestamp)
- [ ] Database migration adds dueDate column to tasks table
- [ ] API accepts dueDate in POST/PUT requests and returns it in responses
- [ ] Task form includes date picker component for setting due date
- [ ] Task detail panel displays due date when set
- [ ] Visual indicator for overdue tasks (past due date, not done)
- [ ] Visual indicator for upcoming due dates (within 24-48 hours)
- [ ] Due date can be cleared/removed

## Real-World Context

This feature is a full-stack implementation touching domain entity, database migration, API validation, and UI components (DatePicker). It teaches schema evolution and date handling patterns.
