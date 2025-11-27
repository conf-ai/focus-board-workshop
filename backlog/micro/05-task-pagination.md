# Micro Task: Task Pagination

## Business Problem

Projects with many tasks load slowly because all tasks are fetched in a single API call. As projects grow, performance degrades and users experience long wait times before seeing any content.

## Impact

- Initial page load gets slower as task count increases
- Large JSON responses consume bandwidth
- Users stare at loading spinners for active projects
- Mobile users with limited data pay for unused task data

## Success Criteria (Observable Outcomes)

- [ ] `GET /api/projects/[id]/tasks` accepts `?page=1&limit=10` query params
- [ ] Response includes pagination metadata (`total`, `page`, `limit`, `hasMore`)
- [ ] Default behavior (no params) returns all tasks for backward compatibility
- [ ] Invalid page/limit values are handled gracefully
- [ ] Endpoint documentation or comments explain the parameters

## Real-World Context

Pagination is essential for scalable APIs. This task demonstrates how to add optional query parameters while maintaining backward compatibility with existing clients.
