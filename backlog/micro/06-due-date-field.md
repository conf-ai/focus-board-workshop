# Micro Task: Due Date Field

## Business Problem

Users cannot set deadlines for tasks. The project specification includes a `dueDate` field, but it was never implemented. Without due dates, users cannot track deadlines or identify overdue work.

## Impact

- Users cannot set task deadlines
- No way to identify overdue or upcoming tasks
- Project planning is less effective without time constraints
- Future features (overdue filtering, calendar view) are blocked

## Success Criteria (Observable Outcomes)

- [ ] Task entity has a `dueDate` field (optional, Date type)
- [ ] TypeORM decorator properly configured for nullable timestamp
- [ ] API accepts `dueDate` when creating/updating tasks
- [ ] API returns `dueDate` in task responses (null if not set)
- [ ] Database migration adds the column correctly

## Real-World Context

Adding fields to existing entities requires careful coordination between domain, database, and API layers. This task demonstrates the full-stack flow for schema evolution.
