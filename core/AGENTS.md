# Core Domain Layer Rules

## Domain Layer Principles
- Pure TypeScript entities with no external dependencies
- Business logic encapsulated in domain services
- TypeORM entities represent data models
- No UI or API concerns in domain layer

## Entity Design Standards
- Use TypeORM decorators consistently
- Include proper validation constraints
- Define clear relationships between entities
- Export entities through index.ts barrel

## Domain Service Patterns
- Business logic lives in service classes
- Services coordinate between entities
- No direct database access in domain logic
- Return typed results or domain events

## Testing Requirements
- Unit tests for all business logic
- Mock external dependencies
- Test edge cases and validation rules
- Maintain >90% coverage for domain layer

## File Organization
```
core/
  domain/
    entities/
      task.entity.ts
      project.entity.ts
    services/
      taskService.ts
      projectService.ts
    types/
      common.types.ts
  index.ts
```

## Constraints
- No React components in core layer
- No API route logic in domain services  
- No database queries in entities
- No external API calls from domain layer

## Quality Standards
- All domain logic must be testable
- Entities should be serializable
- Services should be injectable
- Types should be exported for reuse across layers