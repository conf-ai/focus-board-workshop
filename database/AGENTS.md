# Database Layer Rules

## Data Source Configuration

- `data-source.ts` contains TypeORM AppDataSource configuration
- Database connection settings read from environment variables
- Entity registration happens here - add new entities to the `entities` array

## Migration Standards

- Use TypeORM CLI to generate migrations: `npm run typeorm migration:generate`
- Migration files use incrementing numeric prefixes (0000000000001, 0000000000002, etc.)
- New migrations must increment from the last migration number
- Never modify existing migrations that have run in production
- Test migrations with `npm run typeorm migration:run`

## File Organization

```
database/
  data-source.ts      # TypeORM DataSource configuration
  migrations/         # Database migrations
    0000000000001-initial-schema.ts
    0000000000002-seed-data.ts
    # New migrations increment: 0000000000003-description.ts, etc.
```

## Constraints

- Never commit database credentials
- Use environment variables for all connection settings
- Migrations must be reversible (implement both `up` and `down`)
- Don't use raw SQL - use TypeORM query builder or repository methods
