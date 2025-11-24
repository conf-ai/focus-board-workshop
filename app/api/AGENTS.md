# API Layer Rules

## API Design Standards

- Use Next.js App Router route handlers
- Follow RESTful conventions where appropriate
- Include proper HTTP status codes
- Validate all inputs server-side

## Request/Response Patterns

- Use typed request/response interfaces
- Include proper error handling
- Return consistent JSON structures
- Handle async operations properly

## Validation Requirements

- Validate all incoming data
- Sanitize user inputs
- Return helpful error messages
- Use schema validation (Zod recommended)

## Security Standards

- Never expose database credentials
- Validate authentication tokens
- Sanitize all user inputs
- Use CORS appropriately

## Error Handling

- Return appropriate HTTP status codes
- Include helpful error messages
- Log errors for debugging
- Don't expose internal details

## File Organization

```
app/api/
  tasks/
    route.ts          # GET, POST /api/tasks
    [id]/
      route.ts        # GET, PUT, DELETE /api/tasks/[id]
  projects/
    route.ts          # GET, POST /api/projects
    [id]/
      route.ts        # GET, PUT, DELETE /api/projects/[id]
```

## Testing Requirements

- Test all API endpoints
- Mock database interactions
- Test error scenarios
- Validate response formats

## Quality Standards

- All endpoints must include input validation
- Error responses must be helpful to clients
- API routes should be stateless
- Include proper TypeScript types

## Integration Patterns

- Import domain services from core layer
- Don't include business logic in route handlers
- Use dependency injection for testability
- Handle database transactions appropriately
