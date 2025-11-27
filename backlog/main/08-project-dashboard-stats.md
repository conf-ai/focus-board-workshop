# Main Task: Project Dashboard Stats

## Business Problem

Users have no overview of project health or progress. They must manually count tasks to understand how much work is done, in progress, or remaining. This makes project planning and status reporting tedious.

## Impact

- No quick visibility into project progress
- Cannot assess project health at a glance
- Status reporting requires manual task counting
- Progress over time is not visible
- Users lack motivation from seeing completion progress

## Success Criteria (Observable Outcomes)

- [ ] Stats endpoint returns counts: total, todo, in_progress, done
- [ ] Stats bar component displays above task list
- [ ] Shows task counts for each status with appropriate styling
- [ ] Displays completion percentage (done / total)
- [ ] Progress bar visualizes completion percentage
- [ ] Stats update when tasks are created, updated, or deleted
- [ ] Empty project shows appropriate zero state
- [ ] Stats are performant (don't load all tasks to calculate)

## Real-World Context

This feature teaches data aggregation patterns, progress visualization components, and efficient API design that returns computed values rather than raw data.
