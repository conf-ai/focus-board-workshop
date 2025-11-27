# Main Task: Task Description Field

## Business Problem

Task titles are limited to ~255 characters, which is insufficient for capturing context, requirements, or notes. Users need a place to add detailed information about tasks without cluttering the title or using external tools.

## Impact

- Important task context is lost or truncated
- Users resort to overly long titles that break UI layouts
- No place for acceptance criteria, links, or detailed notes
- Team members lack context when picking up tasks
- Knowledge about task requirements is scattered across tools

## Success Criteria (Observable Outcomes)

- [ ] Task entity has optional `description` field (text, nullable)
- [ ] Database migration adds description column to tasks table
- [ ] API accepts description in POST/PUT requests and returns it in responses
- [ ] Task form includes multiline textarea for description
- [ ] Task detail panel displays description with proper formatting
- [ ] Long descriptions are scrollable or expandable
- [ ] Description supports basic markdown rendering (bold, lists, links)
- [ ] Empty description shows appropriate placeholder or is hidden

## Real-World Context

This feature teaches text field handling, textarea components, markdown rendering basics, and managing optional rich content in a task management context.
