# Main Task: Project Creation & Management

## Business Problem

Projects are currently seeded in the database with no way for users to create new ones from the UI. The POST /api/projects endpoint exists but is unused, limiting users to pre-defined projects and preventing real-world usage patterns.

## Impact

- Users cannot organize work into new projects
- The app feels like a demo rather than a usable tool
- No way to separate different work contexts or team efforts
- Project switching feature has limited value without project creation

## Success Criteria (Observable Outcomes)

- [ ] "New Project" button visible in project switcher or header area
- [ ] Button opens a dialog/modal with project name input
- [ ] Form validates project name (required, reasonable length)
- [ ] Submit calls POST /api/projects with the name
- [ ] New project appears in project switcher after creation
- [ ] User is optionally switched to the new project automatically
- [ ] Success toast confirms project creation
- [ ] Error handling for duplicate names or API failures

## Real-World Context

This feature teaches form dialogs, input validation patterns, API integration for creating resources, and managing application state after successful creation.
