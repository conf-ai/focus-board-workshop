# Task Sorting Controls Implementation Tasks

## Business Context

- **User Problem**: Users cannot control task ordering - tasks appear in an unpredictable sequence that does not match how they work, making it difficult to find recent tasks or focus on high-priority work.
- **User Impact**: Users waste time scanning unordered lists, high-priority work gets buried, and confidence in the system decreases for daily task management.

## Existing Patterns Found

- **Similar Feature**: `components/features/TaskFilters.tsx` - Uses Select dropdowns with Label for filtering by status/priority. This exact pattern should be reused for sort controls.
- **Integration Points**:
  - `app/page.tsx` (lines 96-117) - Contains the filtering/search useEffect that transforms tasks into filteredTasks. Sorting logic should be added here after filtering.
  - `app/page.tsx` (lines 43-51) - State management area where sort state should be added alongside filters.
  - `app/page.tsx` (lines 186-200) - UI area where TaskFilters is rendered, sort control should be added nearby.
- **Patterns to Follow**:
  - Select component pattern from `components/ui/select.tsx` (shadcn/ui Radix-based)
  - Filter options pattern from TaskFilters.tsx (const arrays with value/label objects)
  - State management pattern from page.tsx (useState with typed interface)
  - Effect pattern for derived state (useEffect for filteredTasks)

## Task Breakdown

### Task 1: Create TaskSortSelect Component - COMPLETED

**What**: Create a new `TaskSortSelect.tsx` component in `components/features/` that renders a sort dropdown following the TaskFilters.tsx pattern. The component should accept current sort value and onChange callback, and display sort options for creation date (newest/oldest), priority (high-low/low-high), and status (open-done/done-open).

**Files**:
- Create: `components/features/TaskSortSelect.tsx`

**Acceptance**:
- Component renders a labeled Select dropdown with "Sort by" label
- Contains 6 sort options: "Newest First", "Oldest First", "Priority: High to Low", "Priority: Low to High", "Status: Open First", "Status: Done First"
- Follows the same styling pattern as TaskFilters.tsx (gap, space-y, Label, SelectTrigger with aria-label)
- TypeScript types are properly defined for sort option values

**Implementation**:
- **Files Modified**: Created `components/features/TaskSortSelect.tsx`
- **Evidence**:
  - Component exports `SortOption` type with 6 values: "newest", "oldest", "priority_high", "priority_low", "status_open", "status_done"
  - Uses `space-y-2` for label spacing, Label component with "Sort by" text
  - SelectTrigger has `aria-label="Sort tasks"` for accessibility
  - Options array follows same `{ value, label }` pattern as TaskFilters.tsx
- **Quality**: Lint PASS | TypeScript PASS

### Task 2: Add Sort State and Sorting Logic to Main Page - COMPLETED

**What**: Extend the main page component to include sort state management and implement client-side sorting logic. Add a new `sortOption` state, define a `SortOption` type, and modify the filtering useEffect to also sort the filtered tasks before setting `filteredTasks`.

**Files**:
- Modify: `app/page.tsx`

**Acceptance**:
- New state `sortOption` with type `SortOption` is added (default: "newest")
- Sort type covers all 6 sort options with descriptive string values
- The useEffect that sets `filteredTasks` (lines 96-117) now also sorts tasks after filtering
- Sorting logic correctly handles:
  - Date sorting: compare `createdAt` timestamps
  - Priority sorting: map priority values to numeric weights (high=3, medium=2, low=1)
  - Status sorting: map status values to numeric weights (todo=1, in_progress=2, done=3)
- Sort happens client-side without API calls
- Sort state persists during session (standard React state behavior)

**Implementation**:
- **Files Modified**: `app/page.tsx` (lines 8, 51, 99-142)
- **Evidence**:
  - Line 8: Imports `SortOption` type from TaskSortSelect component
  - Line 51: State `const [sortOption, setSortOption] = React.useState<SortOption>("newest")` with default "newest"
  - Lines 99-100: Weight mappings `priorityWeight: { high: 3, medium: 2, low: 1 }` and `statusWeight: { todo: 1, in_progress: 2, done: 3 }`
  - Lines 122-139: Sorting logic using switch statement handling all 6 sort options
  - Line 142: `sortOption` included in useEffect dependency array for reactivity
  - All sorting is client-side using Array.sort() with no API calls
- **Quality**: Lint PASS | TypeScript PASS

### Task 3: Integrate TaskSortSelect into Page Layout - COMPLETED

**What**: Import and render the TaskSortSelect component in the main page alongside existing TaskFilters component. Wire up the sort state to the component props.

**Files**:
- Modify: `app/page.tsx`

**Acceptance**:
- TaskSortSelect is imported and rendered in the Card containing "Project & Filters" (near line 199)
- Sort dropdown appears visually aligned with TaskFilters dropdowns
- Changing sort option updates the task list immediately (no page reload)
- Sort control is accessible with proper aria-label
- Layout remains responsive on mobile (follows existing flex-col/flex-row pattern)

**Implementation**:
- **Files Modified**: `app/page.tsx` (lines 8, 225)
- **Evidence**:
  - Line 8: Import `import { TaskSortSelect, SortOption } from "@/components/features/TaskSortSelect"`
  - Line 225: Component rendered as `<TaskSortSelect value={sortOption} onChange={setSortOption} />`
  - Positioned after TaskFilters in the same flex container with `flex-col gap-4 md:flex-row md:items-end` for responsive layout
  - Sort control has aria-label="Sort tasks" (from component definition)
  - useEffect dependency on `sortOption` ensures immediate task list updates without page reload
- **Quality**: Lint PASS | TypeScript PASS

## Handoff Notes

**Key Pattern Reference**: The `TaskFilters.tsx` component at `components/features/TaskFilters.tsx` is the primary pattern to follow. It demonstrates:
- How to structure options as const arrays with value/label
- How to use shadcn Select with proper TypeScript typing
- How to handle the onChange callback with type casting
- How to structure the component with Label and proper accessibility

**Sorting Implementation Hint**: The sorting should happen in the same useEffect that handles filtering (lines 96-117 in page.tsx). After all filters are applied, add sorting before `setFilteredTasks(filtered)`. Use JavaScript's `Array.sort()` with a comparison function that switches on the sort option.

**Priority/Status Weight Mapping**: Create simple objects like:
```typescript
const priorityWeight = { high: 3, medium: 2, low: 1 };
const statusWeight = { todo: 1, in_progress: 2, done: 3 };
```

**State Default**: Default sort to "newest" as this is the most common expectation for task lists.

---

## Implementation Summary (Coder Agent)

**Design Principles Applied**:

- **YAGNI**: Did not add server-side sorting, sort persistence to localStorage, or additional sort options beyond specification. Kept sorting purely client-side as specified.
- **DRY**: Reused exact patterns from `components/features/TaskFilters.tsx` - same option array structure, same Label/Select pattern, same type casting approach for onChange handlers.
- **SRP**: TaskSortSelect component has single responsibility (sort selection UI). Sorting logic is co-located with filtering logic in page.tsx useEffect where derived state is computed.
- **SoC**: UI component (TaskSortSelect) separated from sorting logic (page.tsx). Component only handles selection UI, parent handles business logic.

**Quality Verification**: Lint PASS | TypeScript PASS | Tests PASS (7/7) | npm run verify PASS

**Business Value**: Users can now control task ordering with 6 sort options:
- Date-based: newest/oldest first (default: newest)
- Priority-based: high-to-low/low-to-high priority
- Status-based: open first (todo, in_progress, done) or done first

The sort control appears alongside filters in the "Project & Filters" card, providing immediate visual feedback when changed.

**Ready for Tester**: Key validation points:
1. Sort dropdown appears with "Sort by" label in Project & Filters card
2. All 6 sort options are available in dropdown
3. Changing sort option immediately reorders task list without page reload
4. Default sort is "Newest First"
5. Sorting works correctly with filtered results (filter then sort)
6. Layout is responsive on mobile (stacks vertically)

---

## Test Validation Summary (Tester Agent)

**Test Coverage Implemented**:

- **Component Tests**: `components/features/TaskSortSelect.test.tsx` (110 lines)
  - Rendering tests: Sort by label, accessibility attributes, controlled component behavior
  - User interaction tests: All 6 sort options trigger correct onChange callbacks
- **Page Integration Tests**: `app/page.test.tsx` extended (+300 lines)
  - Sort Controls: Dropdown visibility, all options available, default value
  - Sorting Behavior: 8 tests covering all 6 sort algorithms and immediate reorder
  - Filter + Sort Integration: Verifies sorting works correctly after filtering

**User Scenarios Validated**:
- Sort dropdown displays with "Sort by" label in Project & Filters card
- All 6 sort options accessible via dropdown click
- Default sort is "Newest First" on page load
- Selecting "Oldest First" reorders tasks by creation date ascending
- Selecting "Priority: High to Low" shows high priority tasks first
- Selecting "Priority: Low to High" shows low priority tasks first
- Selecting "Status: Open First" shows todo, then in_progress, then done
- Selecting "Status: Done First" shows done, then in_progress, then todo
- Sort changes apply immediately without page reload (client-side)
- Sorting works correctly with filtered results (filter by status, then sort by priority)

**Edge Cases Covered**:
- Empty task list (no errors when sorting empty array)
- Controlled component value updates correctly on prop change
- Multiple sort option changes in sequence

**Accessibility Verified**:
- `aria-label="Sort tasks"` on SelectTrigger for screen readers
- `htmlFor="sort-select"` on Label for proper form association
- Dropdown uses `role="combobox"` with proper ARIA attributes
- Options use `role="option"` for accessible selection

**Test Patterns Applied**:

- **Test Data Factories**: `createMockTask()` and `createMockProject()` for consistent test data
- **Mock Strategies**: URL pattern matching for `/api/projects` and `/api/projects/[id]/tasks`
- **Query Priorities**: `getByRole("combobox")` with name, `getByRole("option")`, `getByRole("list")`
- **Async Handling**: `waitFor()` with proper assertions, no arbitrary timeouts

**Quality Verification**:

```bash
npm run test          # All tests passing (28 tests, 3 suites)
npm run tsc:check     # No TypeScript errors
npm run verify        # Complete project verification passed
```

**Coverage Metrics**:
- Tests run 3 times consecutively with identical results (no flakiness)
- All acceptance criteria from tasks file validated

**Business Value Validated**:

The tests verify that users can now:
1. Find recent tasks quickly with "Newest First" default sort
2. Focus on high-priority work with "Priority: High to Low" sort
3. See outstanding work with "Status: Open First" sort
4. Combine filters and sorts (e.g., filter to "In Progress" + sort by priority)

This directly addresses the user problem: "tasks appear in an unpredictable sequence that does not match how they work, making it difficult to find recent tasks or focus on high-priority work."

**Test Files**:
- `/Users/jahmedov/Documents/Projects/conf.ai/focus-board/components/features/TaskSortSelect.test.tsx`
- `/Users/jahmedov/Documents/Projects/conf.ai/focus-board/app/page.test.tsx`

**Ready for Review**: All 28 tests pass consistently. Feature implementation validated against all acceptance criteria.
