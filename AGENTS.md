# FocusBoard - AI Agent Guidance

This file provides comprehensive guidance for AI agents when working with the FocusBoard codebase.

## Communication Rules

**CRITICAL**: Do NOT create summary documents, wrap-up files, or verbose explanations at the end of responses UNLESS the user explicitly asks for documentation.

## Core Commands

### Development

```bash
npm run dev                    # Start development server
npm run build                  # Production build
npm run test                   # Run all tests
npm run test:watch             # Watch mode testing
npm run lint                   # Check code style
npm run lint:fix               # Auto-fix lint issues
npm run tsc:check              # TypeScript type checking
```

### Database Management

```bash
npm run database:up            # Start PostgreSQL container
npm run database:down          # Stop PostgreSQL container
npm run database:logs          # View database logs
```

### Project Verification

```bash
npm run setup                  # Initial project setup
npm run verify                 # Verify project health
```

## Architecture Overview

### Technology Stack

- **Next.js 16** with TypeScript in strict mode, experimental decorators enabled
- **TypeORM** with PostgreSQL for data persistence
- **Jest + SWC** for testing with React Testing Library
- **shadcn/ui** components built on Radix primitives
- **TailwindCSS** for styling

### Layer Architecture

```
├── core/domain/         # TypeORM entities with business logic
├── app/api/             # Next.js route handlers with validation
├── components/          # React components following atomic design
└── database/            # TypeORM configuration and migrations
```

### Import Path Mapping

- `@/*` resolves to project root
- Jest configured with module name mapping for all `@/*` imports
- TypeScript paths configured for `@/*` pattern

## Development Patterns

### File Naming Conventions

- **Components**: PascalCase (e.g., `TaskList.tsx`, `ProjectSwitcher.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `formatDate.ts`)
- **API Routes**: `route.ts` (Next.js App Router convention)
- **Tests**: `*.test.ts` or `*.test.tsx` (co-located with source)
- **Types**: `*.types.ts` or embedded in source files

### Domain Layer (`core/domain/`)

- Pure TypeScript classes with TypeORM decorators
- Task entity: UUID primary keys, JSON notes field, project relationships
- Status/Priority enums: string literals for database compatibility

### API Layer (`app/api/`)

- Next.js App Router route handlers
- TypeORM DataSource with PostgreSQL connection string from environment
- Automatic migrations and synchronization enabled

### Testing Configuration

- Jest with SWC transformer for TypeScript + TSX
- jsdom environment with React Testing Library setup
- Module name mapper for `@/*` imports
- TypeScript decorators support in test transforms

### Database Setup

- PostgreSQL via Docker Compose in `infra/docker-compose.yml`
- TypeORM entities auto-loaded from `core/domain/index.ts`
- Migration files in `database/migrations/`

### Quality Requirements

- All tests must pass: `npm run test`
- Code must be lint-clean: `npm run lint`
- TypeScript must compile: `npm run tsc:check`
- Database must be running for API tests
