---
description: "Run complete Planner→Coder→Tester→Reviewer workflow for micro tasks (20 min features). Ideal for workshop exercises."
args:
  - name: "feature_file"
    description: "Path to the micro feature task file (e.g., backlog/micro/01-invalid-data-crashes.md)"
    required: true
---

# /flow - Complete AI Engineering Workflow

I'll run the complete Planner→Coder→Tester→Reviewer agent chain for micro tasks, demonstrating the full AI Engineering Reliability Stack workflow.

**Usage**: `/flow $1`

This command is designed for **micro tasks only** (≤20 minutes) and executes the complete Plan→Act→Reflect cycle:

## Workflow Steps

### 🔍 Phase 1: Planner Agent (Business Discovery & Technical Scout)

**Agent**: Business analyst and technical scout who transforms feature cards into actionable task breakdowns

- Read feature card at `$1` to understand business problem
- Discover existing codebase patterns and integration points
- Navigate context architecture (AGENTS.md files)
- Create `{filename}.tasks.md` with actionable task breakdown
- Bridge business understanding and technical implementation

### 🔧 Phase 2: Coder Agent (Pattern-Following Developer)

**Agent**: Senior software engineer who transforms task breakdowns into production-quality implementations

- Execute tasks from `{filename}.tasks.md` sequentially
- Implement following discovered patterns with explicit design principles (YAGNI/DRY/SRP/SoC)
- Maintain architectural integrity and code quality standards
- Transform specifications into working implementations

### ✅ Phase 3: Tester Agent (Testing Trophy & Quality Assurance)

**Agent**: Comprehensive testing expert implementing Testing Trophy methodology with Jest/RTL expertise

- Validate business value delivery through comprehensive test coverage
- Prioritize integration tests simulating real user interactions
- Follow user-centric Testing Library principles
- Ensure features work as intended for actual users
- Run quality checks (test/lint/type)

### 📚 Phase 4: Reviewer Agent (Security & Quality Validator)

**Agent**: Senior code reviewer specializing in Next.js/TypeScript task management security, performance, and quality

- Validate code for security vulnerabilities and performance issues
- Ensure production-ready code quality standards
- Identify critical issues with specific, actionable solutions
- Extract architectural insights and update team knowledge
