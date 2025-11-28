# FocusBoard - AI Engineering Workshop

A task management application built to demonstrate AI-powered development workflows using Claude Code and Cursor.

## 🎯 Workshop Overview

This repository teaches the complete **AI Engineering Reliability Stack**:

1. **Context Architecture** - AGENTS.md files that serve as AI memory
2. **Plan → Act → Reflect Loop** - Structured development rhythm
3. **Four Agent Roles** - Planner, Coder, Tester, Reviewer specialization
4. **Bounded Scope** - Small, testable, reviewable changes
5. **Cross-Tool Sync** - Consistent behavior between Claude Code and Cursor

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Claude Code or Cursor IDE

### Setup

```bash
# Clone and install dependencies
npm install

# Start PostgreSQL database
npm run database:up

# Setup workshop
npm run setup

# Start development server
npm run dev
```

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Next.js 16 + TypeScript + TailwindCSS
- **Backend**: Next.js API routes + TypeORM
- **Database**: PostgreSQL (Docker)
- **UI**: shadcn/ui components
- **Testing**: Jest + React Testing Library

### Layer Structure

```
├── core/domain/          # Pure business logic + entities
├── core/services/        # Business logic services
├── app/api/             # REST API endpoints
├── components/          # React UI components
└── database/            # TypeORM configuration
```

## 🤖 AI Context System

### Root Context (`AGENTS.md`)

Global project rules, build commands, coding standards

### Nested Context

- `core/AGENTS.md` - Domain layer constraints
- `app/api/AGENTS.md` - API patterns and validation
- `components/AGENTS.md` - UI standards and accessibility

### Role Prompts (`.claude/agents/`)

- `planner.md` - Creates bounded implementation plans
- `coder.md` - Implements planned changes step-by-step
- `tester.md` - Validates functionality and quality
- `reviewer.md` - Final architectural and security review

## 📋 Workshop Flow

### Phase 1: Bottleneck Mapping (Mural Board)

Identify real friction points in your development workflow

### Phase 2: Agent Role Mapping (Mural Board)

Design how AI agents will solve your specific bottlenecks

### Phase 3: Guided Co-Build

Build context files and role prompts together

### Phase 4: Micro-Run (15-20 min features)

Validate the system with small, focused tasks

### Phase 5: Cursor Integration

Experience cross-tool context sharing

### Phase 6: Capstone Challenge (45+ min features)

Apply complete reliability stack to complex features

## 🎮 Feature Cards

### Micro Tasks (`backlog/micro/`)

10 small, focused tasks perfect for 15-20 minute sessions:

- Input validation for task creation
- Fix task sorting order
- Add accessibility labels
- Search and filter functionality
- Priority indicators

### Main Tasks (`backlog/main/`)

10 medium features requiring multiple steps:

- Task status filtering
- Project switcher functionality
- Task notes documentation
- Task relationships and grouping

### Capstone Missions (`backlog/capstone/`)

3 complex, multi-layer challenges:

- Ambiguous user feedback handling
- Performance mystery debugging
- Strategic architecture decisions

## 📊 Commands Reference

### Development

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run test          # Run all tests
npm run test:watch    # Watch mode testing
npm run lint          # Check code style
npm run tsc:check     # TypeScript validation
```

### Database

```bash
npm run database:up    # Start PostgreSQL
npm run database:down  # Stop PostgreSQL
npm run database:logs  # View DB logs
```

### Workshop Tools

```bash
npm run verify        # Verify workshop setup
npm run setup         # Initial project setup
```

## 🎓 Learning Outcomes

By the end of this workshop, participants will have:

1. **Built Production-Ready AI Context** - AGENTS.md files for their own projects
2. **Mastered Plan-Act-Reflect** - Structured AI development workflow
3. **Experienced Bounded Scope** - Safe, reviewable AI-powered changes
4. **Proven Cross-Tool Sync** - Consistent behavior between Claude Code and Cursor
5. **Delivered Real Features** - Working FocusBoard functionality using AI assistance

## 📚 Key Files

- `AGENTS.md` - Root project context and standards
- `CLAUDE.md` - Claude Code specific configuration
- `[feature-name].tasks.md` - Task-specific plans (shared between AI tools)
- `backlog/` - Progressive difficulty challenges (micro/main/capstone)
- `.claude/agents/` - Specialized role prompts (planner/coder/tester/reviewer)
- `core/AGENTS.md` - Domain layer rules
- `app/api/AGENTS.md` - API layer rules
- `components/AGENTS.md` - UI component rules

## 🔧 Troubleshooting

### Database Issues

```bash
npm run database:down && npm run database:up
```

### Context Sync Issues

Verify nested AGENTS.md files are properly referenced in CLAUDE.md

### Test Failures

```bash
npm run verify  # Full project health check
```

## 🤝 Contributing

This repository demonstrates patterns - feel free to adapt the context files and feature cards for your own projects!
