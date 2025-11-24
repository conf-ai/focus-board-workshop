# UI Components Layer Rules

## Component Design Standards

- Use functional components with hooks
- Follow shadcn/ui component patterns
- Implement proper TypeScript types
- Include accessibility attributes

## Styling Guidelines

- Use Tailwind CSS for styling
- Follow design system tokens
- Ensure responsive design
- Maintain consistent spacing and typography

## Component Architecture

- Atomic design principles (atoms, molecules, organisms)
- Single responsibility per component
- Reusable and composable components
- Clear prop interfaces

## State Management

- Use local state for component-specific data
- Lift state up when needed by multiple components
- Use context for app-wide state
- Avoid prop drilling

## File Organization

```
components/
  ui/                 # shadcn/ui base components
    button.tsx
    input.tsx
    card.tsx
  features/           # Feature-specific components
    TaskList.tsx
    TaskItem.tsx
    ProjectSwitcher.tsx
  layout/             # Layout components
    Header.tsx
    Sidebar.tsx
```

## Performance Standards

- Minimize re-renders with React.memo
- Use useMemo/useCallback appropriately
- Lazy load heavy components
- Optimize bundle size

## Integration Patterns

- Import UI components from shadcn/ui
- Use custom hooks for business logic
- Keep components pure when possible
- Handle loading and error states

## Quality Standards

- All components must be typed with TypeScript
- Include proper error boundaries
- Handle edge cases gracefully
- Maintain consistent UX patterns
