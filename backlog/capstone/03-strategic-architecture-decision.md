# Capstone Challenge 3: "Two Teams Want to Use FocusBoard But For Completely Different Workflows"

## Business Problem

Your FocusBoard tool has gained internal traction. The platform team loves it for tracking technical work. But now two other teams want to adopt it, and they work very differently:

**Team A - Customer Success:**

- Needs rapid-response ticket workflows with strict SLAs
- Every task must have a response time, escalation rules, and customer context
- Workflow: New → Acknowledged → In Progress → Awaiting Customer → Resolved → Closed
- Must integrate with their support metrics dashboard
- Time-sensitive: response within 2 hours or auto-escalate

**Team B - Product Discovery:**

- Needs exploratory research tracking with fuzzy scope
- Tasks don't have "completion" - they evolve and branch into new questions
- Workflow: Hypothesis → Research → Insights → Decision → Archive
- Needs to link tasks to research artifacts (notes, user interviews, data)
- Success isn't "done tasks" - it's "learning captured"

**Current FocusBoard workflow:**

- Open → In Progress → Done
- Designed for engineering tasks with clear completion

**The pressure:**

- Both teams want to start using it next week
- Leadership sees this as validation of the tool's value
- But you can't just build custom versions for everyone
- Engineering manager warns: "If we fragment this, maintenance will kill us"

**Your mission:** You have 60 minutes to make an architectural decision about how FocusBoard should handle different team workflows, and deliver a working proof of that strategy.

## Impact

- **Adoption Opportunity**: 40+ additional users across two teams want to use the tool
- **Product Strategy Uncertainty**: Is this one flexible tool or multiple specialized tools?
- **Technical Debt Risk**: Wrong architectural decision now = painful refactor later
- **Organizational Value**: Tool could become company-wide standard or remain niche
- **Maintenance Burden**: Every "custom" solution increases long-term support cost
- **Team Dynamics**: Teams will build shadow IT tools if FocusBoard can't adapt

## Success Criteria (Observable Outcomes)

### Minimum Viable Success

- [ ] **Clear Architectural Decision**: Explicit choice of approach with documented reasoning
- [ ] **Trade-off Analysis**: Understanding of what you're gaining and sacrificing
- [ ] **Proof of Concept**: Working implementation demonstrating the chosen strategy
- [ ] **Validation Logic**: Explanation of why this approach serves both teams

### Full Success

- [ ] **Strategic Thinking**: Used structured approach to evaluate options before building
- [ ] **Stakeholder Consideration**: Solution addresses needs of original users AND new teams
- [ ] **Future-Proof Design**: Approach scales to Team C, D, E without architectural rewrite
- [ ] **Context Architecture**: Documented decision framework and architectural principles in AGENTS.md
- [ ] **Agent System Extension**: Created strategist/evaluator agent for future architectural decisions

## The Challenge

This isn't a coding problem. This is an **architectural strategy problem** disguised as a feature request.

**The real questions:**

1. **Product Vision**: Is FocusBoard a flexible workflow tool or a task tracker?
2. **Customization Strategy**: Configuration, plugins, or forked versions?
3. **Maintenance Model**: Shared core with variants, or one tool that handles everything?
4. **User Experience**: Different workflows or unified with options?
5. **Future Scalability**: What happens when Team C, D, E want different workflows?

**You must choose an approach, understanding that every choice has serious trade-offs.**

## Real-World Context

This challenge mirrors situations that separate senior from staff engineers:

- **Mid-level**: "I'll make workflows configurable" (solution-focused)
- **Senior**: "Let me evaluate configuration vs templating vs forking" (options-aware)
- **Staff**: "This is a product strategy decision about flexibility vs simplicity for the next 2 years" (strategic framing)

**The skills being tested:**

- Can you recognize when a request requires strategic thinking, not just implementation?
- Can you generate and evaluate multiple valid options with trade-offs?
- Can you make architectural decisions under uncertainty and own the reasoning?
- Can you use AI to structure strategic thinking, not replace it?

## Time Allocation Guidance

- **0-20 minutes**: Strategic analysis and option generation
- **20-25 minutes**: Decision on approach with documented reasoning
- **25-45 minutes**: Proof of concept implementation
- **45-55 minutes**: Validation with both team scenarios
- **55-60 minutes**: Documentation of decision and patterns
