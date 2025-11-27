# Lib (Utilities) Layer Rules

## Utility Design Standards

- Pure functions preferred - no side effects
- Single responsibility - one function, one purpose
- Type all parameters and return values

## Utility Categories

- **Formatting**: Date, currency, string formatting
- **Validation**: Input validation helpers
- **Transformers**: Data transformation utilities
- **Constants**: Application-wide constants

## File Organization

```
lib/
  utils.ts            # General utilities (cn for classnames)
  formatters.ts       # Date, number, string formatters
  validators.ts       # Validation helpers
  constants.ts        # App constants
  index.ts            # Barrel export
```

## Patterns

```typescript
/**
 * Brief description of utility purpose.
 *
 * @param input - Input description
 * @returns Output description
 *
 * @example
 * const result = utilityName("input");
 * // result: "expected output"
 */
export function utilityName(input: InputType): OutputType {
  // Implementation
}
```

## Constraints

- No React imports in lib/ (use hooks/ for React utilities)
- No API calls (use services or hooks)
- Must be unit testable in isolation
- Avoid external dependencies when possible
