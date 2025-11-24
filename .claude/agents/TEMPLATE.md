---
name: template
description: Template for building reliable AI agents using the 5-part Structured Instructions framework
model: inherit
color: gray
---

# Agent Template - Structured Instructions Framework

This template demonstrates how to build reliable AI agents using the **5-part Structured Instructions framework** with Anthropic best practices. Copy this structure and adapt the sections for your specific agent's purpose.

## Framework Foundation: The Goldilocks Principle

Effective agent instructions are:

- **Not too simple** (lacks actionable guidance)
- **Not too complex** (overwhelming and hard to follow)
- **Just right** (clear, actionable, with concrete examples)

## Core Principles from Anthropic

Before diving into the framework, understand these foundational principles:

1. **Single Responsibility**: Each agent has ONE clear purpose
2. **Pattern Discovery First**: Reuse existing patterns before creating new ones
3. **Minimal Mocking**: Let cheap dependencies run (sociable tests over isolated)
4. **Context Awareness**: Manage context to prevent overflow
5. **Graceful Failure**: Every agent needs emergency procedures
6. **Transparency**: Show reasoning and planning steps
7. **Start Simple, Iterate**: Begin minimal, add one capability at a time

## The 5-Part Framework in Practice

### 1. Context: Agent's Operational Reality

**What this agent knows and where it operates**

```markdown
## Context

You are a [role] who [primary responsibility]. You receive [input format] containing [input contents]. You [relationship to other agents/workflow].

Your role [bridges/enables/transforms] [specific value] by following a systematic approach: [process steps].
```

**Example from Planner Agent:**

> You are a business analyst and technical scout who transforms feature cards into actionable task breakdowns. You receive feature cards containing business problems, impact descriptions, and success criteria.

### 2. Objective: Single, Measurable Outcome

**What this agent produces**

```markdown
## Objective

[Verb] a [specific deliverable] that [transforms input] into [output] by [method/approach].
```

**Example from Coder Agent:**

> Execute each task in the breakdown sequentially, transforming Planner's specifications into working, tested implementations that solve business problems.

### 3. Constraints: Guardrails and Boundaries

**Rules that prevent drift and ensure quality**

```markdown
## Constraints

**[Category 1]: [Rule Type]**:

- [Specific rule with actionable guidance]
- [Specific rule with measurable criteria]
- [Boundary condition with clear limit]

**[Category 2]: [Rule Type]**:

- [Technical constraint with file/tool reference]
- [Process constraint with sequence requirement]
- [Quality constraint with verification method]
```

**Example Pattern:**

```markdown
**Pattern Application Excellence**:

- Follow architectural patterns discovered by Planner with project-relative file references
- Reuse existing utilities, components, and conventions identified in codebase analysis
- Apply design principles (YAGNI, DRY, SRP, SoC) explicitly with documented reasoning
```

### 4. Checks: Validation and Handoff Criteria

**How to verify success before moving forward**

```markdown
## Checks

Before [milestone/handoff], verify:

- [ ] [Specific verification with observable evidence]
- [ ] [Quality check with tool/command reference]
- [ ] [Business value check with success criteria]
- [ ] [Integration check with system validation]

Before handoff to [Next Agent], verify:

- [ ] [Handoff-specific validation criteria]
- [ ] [Output format requirements met]
- [ ] [Next agent can proceed without additional discovery]
```

### 5. Output: Structured Deliverable Format

**Exact format specification for consistency**

````markdown
## Output

[Update/Create] `{filename}.[extension]` with this structured format:

```markdown
# [Title Structure]

## [Section 1]

- **[Field]**: [Content guidance]
- **[Field]**: [Content guidance]

## [Section 2]

### [Subsection]: [Content Pattern]

**[Field]**: [Content guidance]
**[Field]**: [Content guidance]
```
````

### 6. Emergency Procedures: Failure Recovery (REQUIRED)

**How to handle common failure scenarios gracefully**

```markdown
## Emergency Procedures

- **[Failure Scenario 1]**: [Specific recovery action, never assume]
- **[Unclear Input]**: [Request clarification with specific questions, don't guess]
- **[Tool/API Failure]**: [Graceful degradation strategy with fallback]
- **[Context Overflow]**: [Summarization or reset approach with preservation of key decisions]
- **[Pattern Not Found]**: [Minimal viable pattern creation with documentation]
```

**Example from Tester Agent:**

> - **Flaky Tests Detected**: Identify race conditions with `waitFor` debugging, add proper async handling, never use `setTimeout`
> - **Test Pattern Unclear**: Study existing test files in same directory, copy proven patterns, maintain consistency
> - **Coverage Below Threshold**: Focus on critical paths first, test user-facing behavior, skip trivial getters/setters

**Why Critical**: Agents must handle failures without human intervention. Emergency procedures prevent drift and maintain reliability.

## Additional Best Practices Sections

### Context Management Strategy (RECOMMENDED)

```markdown
## Context Management

**How to maintain focus and prevent context overflow**:

- **Just-in-Time Loading**: Only retrieve context when actively needed for current task
- **Context Isolation**: Operate within bounded context specific to this agent's responsibility
- **Pattern Discovery First**: Search for existing patterns in [specific directories] before creating new ones
- **Context Compression**: Summarize key decisions and prune implementation details
- **Periodic Reset**: [When to reset context during long sessions]
```

### Tool Access Boundaries (RECOMMENDED)

```markdown
## Tool Access

**What this agent CAN and CANNOT do**:

**Allowed Tools**:

- [Tool 1]: [Why this tool is essential for agent's purpose]
- [Tool 2]: [Specific use cases within agent's scope]

**Out of Scope**:

- [Tool X]: [Why this is forbidden - belongs to another agent]
- [Tool Y]: [Boundary rationale - prevents scope creep]
```

### Anti-Patterns: Include as Final Subsection in Constraints (BEST PRACTICE)

**Anti-patterns ARE constraints** - they define negative guardrails (what NOT to do). For semantic correctness and clarity, include anti-patterns as the final subsection within your `## Constraints` section rather than as a separate top-level section.

```markdown
## Constraints

**[Positive Constraint Category 1]**:
- [What TO do]

**[Positive Constraint Category 2]**:
- [What TO do]

**Anti-Patterns** (What NOT to Do):

❌ **[Anti-Pattern 1]**: [Why it's wrong with specific example]
✅ **Instead**: [Correct approach with concrete example]

❌ **[Anti-Pattern 2]**: [Specific failure mode]
✅ **Instead**: [Better pattern]
```

**Why This Structure?**
- Semantically correct: anti-patterns are negative constraints
- Reduces cognitive load: all behavioral rules in one section
- Aligns with Anthropic's principle of "clear constraints"
- Maintains the clean 5-part framework structure

## Complete Agent Template

````markdown
---
name: your-agent-name
description: When to use this agent and what it accomplishes
model: inherit
color: [blue|green|red|yellow|purple|gray]
---

# [Agent Name] - [Clear Purpose Statement]

## Context

You are a [role/persona] who [primary responsibility and value]. You receive [input format] containing [specific input contents].

Your role [relationship to workflow] by following [systematic approach]: [process steps].

## Objective

[Action verb] a [specific deliverable] that [transformation process] by [method/constraint].

## Constraints

**[Category 1]**:

- [Specific actionable rule with concrete example]
- [Measurable quality standard with verification method]
- [Clear boundary condition with specific limit]

**[Category 2]**:

- [Technical constraint with project-relative file references]
- [Process requirement with explicit sequence]
- [Integration rule with system context and validation]

**[Category 3 - Pattern Discovery]** (if applicable):

- Discover existing patterns in [specific directories with paths]
- Reuse [specific utilities/components] from codebase
- Create new patterns only when existing solutions insufficient
- Document pattern decisions for future agents

**Anti-Patterns** (What NOT to Do):

❌ **[Anti-Pattern 1]**: [Specific mistake with example]
✅ **Instead**: [Correct approach with concrete guidance]

❌ **[Anti-Pattern 2]**: [Common failure mode]
✅ **Instead**: [Better pattern with rationale]

## Checks

Before [milestone/completion of each subtask], verify:

- [ ] [Observable verification with specific evidence: "npm run test passes"]
- [ ] [Quality check with exact tool/command: "npm run lint" clean]
- [ ] [Business value validation with measurable criteria]
- [ ] [Integration check with system validation method]

Before handoff to [Next Agent Name], verify:

- [ ] [Handoff readiness with specific deliverable format]
- [ ] [Output format compliance with example structure]
- [ ] [Next agent can proceed without additional discovery]
- [ ] [All emergency scenarios documented if encountered]

## Output

[Create/Update] `{filename}.[ext]` with:

```markdown
# [Output Structure]

## [Required Section 1]

- **[Field]**: [Content pattern with specific example]

## [Required Section 2]

### [Subsection Pattern]

**[Field]**: [Content guidance with format]
**[Field]**: [Evidence requirement with verification]
```
````

## Emergency Procedures

- **[Common Failure Scenario 1]**: [Specific recovery action with concrete steps]
- **[Unclear Input]**: Request clarification with specific questions: "[Example questions]"
- **[Tool/API Failure]**: [Fallback approach: "If X fails, try Y, then Z"]
- **[Context Overflow]**: [Reset strategy: "Summarize key decisions, prune details"]
- **[Pattern Not Found]**: [Minimal viable solution with documentation for future]

```

## Framework Examples

### ✅ Good Agent Instruction Example

```

Context: Quality engineer validates implementations through user-centric tests
Objective: Create comprehensive test coverage that validates business value through user-centric tests
Constraints: Follow Testing Library principles, discover patterns in components/\*_/_.test.tsx,
reuse test factories like createMockTask(), never import from @jest/globals
Checks: Tests pass (npm run test), TypeScript clean (npm run tsc:check),
MANDATORY npm run verify passes, tests read like requirements
Output: Update {filename}.tasks.md with test validation summary including coverage metrics
Emergency: Flaky tests → use waitFor debugging | Coverage low → focus critical paths first

```

**Why Good**: Specific tools, concrete commands, clear boundaries, measurable checks, graceful failure handling

### ❌ Bad Agent Instruction

```

"Make an agent that does the [task] and make it good"

```

**Why Bad**: Vague objective, no constraints, no verification criteria, no failure handling, no examples

### ✅ Another Good Example (Pattern Discovery)

```

Context: You receive feature cards and scout existing codebase patterns
Objective: Create {filename}.tasks.md with 2-8 tasks based on feature complexity
Constraints: Discover patterns in components/ui/\*.tsx before creating new,
use project-relative paths, prioritize reuse over creation
Checks: Found patterns with file references, tasks have acceptance criteria,
Coder can start immediately without additional discovery
Emergency: No patterns found → create minimal viable pattern with rationale

```

### ❌ Anti-Patterns in Agent Design

**Don't Do These:**

❌ **Vague Constraints**: "Follow best practices"
✅ **Specific**: "Use userEvent.setup() for interactions, never fireEvent"

❌ **Abstract Checks**: "Ensure quality"
✅ **Measurable**: "npm run verify passes completely"

❌ **Missing Emergency**: No failure handling
✅ **Explicit Recovery**: "If X fails, try Y with [specific approach]"

❌ **No Examples**: Just template variables
✅ **Concrete Examples**: Actual code snippets and commands

❌ **Implementation Testing**: Test React internals
✅ **Behavior Testing**: Test what users see and do

❌ **Anti-Patterns as Separate Section**: Creates extra top-level section
✅ **Anti-Patterns in Constraints**: Final subsection within Constraints for semantic correctness

Remember: Your agent should demonstrate the framework principles while solving real problems with clear, actionable instructions.

## Using This Template

### Step-by-Step Process

1. **Start Simple**: Copy the minimal agent template (Context → Objective → Constraints → Checks → Output)
2. **Add One Capability**: Begin with single, clear responsibility
3. **Add Emergency Procedures**: Define 3-5 common failure scenarios with specific recovery actions
4. **Add Concrete Examples**: Replace ALL `[placeholders]` with actual examples from your domain
5. **Test with Real Task**: Run agent with actual input, observe behavior
6. **Iterate and Refine**: Add constraints/checks based on what went wrong
7. **Add Optional Sections**: Context Management, Tool Access, Anti-Patterns as needed
8. **Version Control**: Commit agent, track changes, document iterations

### Quality Checklist

Before finalizing your agent, verify:

- [ ] **Single Responsibility**: Agent has ONE clear purpose, not multiple concerns
- [ ] **Concrete Examples**: Every `[placeholder]` replaced with actual example
- [ ] **Measurable Checks**: All checks have specific commands or observable evidence
- [ ] **Emergency Procedures**: 3+ failure scenarios with explicit recovery steps
- [ ] **Pattern Discovery**: Agent knows where to find and how to reuse existing patterns
- [ ] **Tool Boundaries**: Clear what agent CAN and CANNOT do
- [ ] **Handoff Protocol**: Next agent knows exactly what they're receiving
- [ ] **Real World Tested**: Agent executed on actual task with success

### Common Pitfalls to Avoid

❌ **Too Broad**: "Handle all testing" → ✅ "Validate business value through user-centric component tests"
❌ **Vague Checks**: "Ensure quality" → ✅ "npm run verify passes completely"
❌ **No Failures**: Missing emergency procedures → ✅ "If X fails, do Y with [specific steps]"
❌ **Abstract Examples**: `[Content pattern]` → ✅ `"it('fetches filtered results when search entered')"`
❌ **Isolated Agent**: No workflow context → ✅ "Receives from Coder, hands to Reviewer"

### Continuous Improvement

**After each agent execution:**

1. **What worked?** → Keep and document as pattern
2. **What failed?** → Add to Emergency Procedures
3. **What was unclear?** → Add concrete example or constraint
4. **What was missing?** → Update Checks with new criteria
5. **Context overflow?** → Add Context Management strategy

**Remember**: Agents improve through iteration. Start minimal, add based on real failures, keep what works.
```
