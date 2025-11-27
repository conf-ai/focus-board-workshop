# Micro Task: Task Description Field

## Business Problem

Tasks only have titles, which limits how much context users can provide. Complex tasks need additional details, acceptance criteria, or notes that don't fit in a short title.

## Impact

- Users cannot add context to tasks beyond the title
- Complex tasks lack necessary detail
- Team members cannot understand task requirements
- Tasks require external documentation to be useful

## Success Criteria (Observable Outcomes)

- [ ] Task entity has a `description` field (optional, text type)
- [ ] TypeORM decorator properly configured for nullable text
- [ ] API accepts `description` when creating/updating tasks
- [ ] API returns `description` in task responses (null if not set)
- [ ] Existing task creation still works without description

## Real-World Context

Adding optional text fields is a common enhancement. This task shows how to extend the domain model while maintaining backward compatibility.
