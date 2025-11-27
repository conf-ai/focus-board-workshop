# Micro Task: Title Formatting Helper

## Business Problem

Users sometimes paste task titles from emails or documents that contain extra whitespace, multiple spaces between words, or trailing spaces. These display poorly and make the task list look unprofessional.

## Impact

- Task titles display with awkward spacing
- Copy-pasted text creates inconsistent formatting
- Lists look messy and unprofessional
- Search and sorting may behave unexpectedly with whitespace variations

## Success Criteria (Observable Outcomes)

- [ ] A `formatTitle()` helper function exists in the domain layer
- [ ] Leading and trailing whitespace is removed
- [ ] Multiple consecutive spaces are collapsed to single spaces
- [ ] Function handles edge cases (empty string, only whitespace)
- [ ] Function is used when creating/updating tasks
- [ ] Existing task creation still works correctly

## Real-World Context

Input normalization is a fundamental data quality practice. This task demonstrates how domain-level helpers ensure data consistency regardless of input source.
