# Main Task: Task Tags & Labels

## Business Problem

Tasks can only be categorized by status and priority. Users cannot add custom labels to group related tasks across projects, track task types (bug, feature, chore), or create their own organizational taxonomy.

## Impact

- No way to find all tasks of a certain type (e.g., all bugs)
- Related tasks across projects cannot be linked
- Users lack flexible organization beyond fixed status/priority
- Filtering options are limited to predefined fields
- Teams cannot establish shared vocabulary for task types

## Success Criteria (Observable Outcomes)

- [ ] Tag entity exists with id, name, and optional color fields
- [ ] TaskTag junction table links tasks to tags (many-to-many)
- [ ] API endpoints for tag CRUD: GET /api/tags, POST /api/tags
- [ ] Task API returns associated tags and accepts tag IDs for create/update
- [ ] Task form allows adding/removing tags from a task
- [ ] Tag input supports selecting existing tags or creating new ones
- [ ] Task item and detail panel display tag badges
- [ ] Filter dropdown includes tag-based filtering option

## Real-World Context

This feature teaches normalized database design with junction tables, many-to-many relationships in TypeORM, tag input UI patterns, and cross-entity filtering.
