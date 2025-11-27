# Hooks Layer Rules

## Hook Design Standards

- Prefix all hooks with `use` (e.g., `useDebounce`, `useTasks`)
- Return typed values - no `any` types
- Handle cleanup in useEffect return functions
- Document parameters and return values with TSDoc

## Hook Categories

- **Data Hooks**: Fetch and manage server data (e.g., `useTasks`, `useProjects`)
- **UI Hooks**: Manage UI state (e.g., `useDebounce`, `useLocalStorage`)
- **Form Hooks**: Form state and validation (e.g., `useForm`)

## File Organization

```
hooks/
  useTasks.ts         # Task data fetching and mutations
  useProjects.ts      # Project data fetching
  useDebounce.ts      # Debounce utility hook
  index.ts            # Barrel export
```

## Patterns

```typescript
/**
 * Brief description of hook purpose.
 *
 * @param paramName - Parameter description
 * @returns Description of return value
 *
 * @example
 * const debouncedValue = useDebounce(searchQuery, 300);
 */
export function useHookName(param: Type): ReturnType {
  // Implementation
}
```

## Constraints

- No side effects outside useEffect
- Clean up subscriptions, timers, event listeners
- Memoize callbacks and expensive computations
- Handle loading and error states for async hooks
