# Capstone Challenge 1: "Our AI Agents Keep Making Wrong Assumptions"

## Business Problem

Your team has been using AI agents to help with development, but there's a recurring problem that's undermining the entire workflow:

**The symptoms:**

- The Planner suggests changes that conflict with existing architectural patterns
- The Coder implements features that duplicate existing utilities
- PRs get rejected because "we already have a component for that"
- AI-generated code doesn't follow the project's established conventions
- Every task starts with the AI re-learning what the codebase already contains

**The pressure:**

- Senior engineers spend more time correcting AI mistakes than coding
- AI adoption is stalling because "it doesn't understand our codebase"
- New team members ask "why didn't the AI know about X?"
- Leadership is questioning ROI on AI tooling investment
- The team is considering abandoning AI-assisted development entirely

**Your mission:** You have 60 minutes to solve the "AI doesn't understand our codebase" problem.

## Impact

- **Productivity Loss**: Engineers spend 30% of AI-assisted time fixing incorrect assumptions
- **Trust Erosion**: Team losing confidence in AI tooling after repeated mistakes
- **Knowledge Silos**: Implicit codebase knowledge isn't accessible to AI agents
- **Onboarding Friction**: New developers and AI agents make the same mistakes
- **Investment Risk**: $50k+ in AI tooling at risk if adoption continues to decline

## Success Criteria (Observable Outcomes)

### Minimum Viable Success

- [ ] AI agents no longer suggest changes that conflict with existing patterns
- [ ] New features correctly identify and reuse existing components/utilities
- [ ] Architectural decisions are discoverable without reading all code
- [ ] The research process is repeatable for any new task

### Full Success

- [ ] Any new task starts with accurate codebase understanding
- [ ] Existing patterns and conventions are automatically considered
- [ ] The workflow prevents "duplicate implementation" mistakes
- [ ] Future developers benefit from captured architectural knowledge

## Real-World Context

Every codebase has implicit knowledge - patterns, conventions, architectural decisions - that experienced developers know but isn't written anywhere. When this knowledge exists only in people's heads:

- New team members make avoidable mistakes
- AI agents can't leverage existing solutions
- The same problems get solved multiple ways
- Technical debt accumulates from inconsistency

This challenge tests whether you can bridge the gap between "code as written" and "code as understood by the team."

**You have 60 minutes. How you approach this is up to you.**
