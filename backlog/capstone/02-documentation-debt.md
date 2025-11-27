# Capstone Challenge 2: "The Codebase Has Become Unreadable"

## Business Problem

Your team just completed a successful hiring sprint - 3 new engineers start next week. During onboarding prep, the engineering manager reviewed the codebase and raised an alarm:

**The symptoms:**

- API routes have no documentation - new devs won't know what endpoints exist or what they expect
- Component props are untyped or use `any` - impossible to understand interfaces without reading implementation
- Business logic in `core/domain/` lacks explanation of why decisions were made
- No architecture overview - new hires will waste weeks understanding the structure
- Existing engineers rely on tribal knowledge that isn't written down

**The pressure:**

- New hires start Monday - they need to be productive within 2 weeks
- Leadership is questioning if the codebase is "enterprise ready"
- The senior engineer who wrote most of the code is going on a 3-week vacation
- Code review process has no documentation standards - the debt keeps growing

**Your mission:** You have 60 minutes to address the documentation crisis before onboarding begins.

## Impact

- **Onboarding Failure Risk**: New engineers could take 4-6 weeks to become productive instead of 2
- **Knowledge Silos**: Critical system knowledge exists only in one person's head
- **Maintenance Burden**: Every bug fix requires archaeology to understand the code
- **Quality Decline**: Without documented standards, code quality will drift further
- **Enterprise Perception**: Prospects reviewing the codebase see an amateur operation

## Success Criteria (Observable Outcomes)

### Minimum Viable Success

- [ ] Systematically identified the most critical documentation gaps
- [ ] Added meaningful documentation to at least 3 high-impact areas
- [ ] New engineers can understand key APIs without asking questions
- [ ] A repeatable process exists for finding undocumented code

### Full Success

- [ ] Comprehensive coverage of API routes, components, and domain logic
- [ ] Critical functions have clear explanations of purpose and usage
- [ ] Architecture is understandable from documentation alone
- [ ] Future documentation gaps will be caught before they accumulate

## Real-World Context

Documentation debt is universal and often ignored until it becomes a crisis:

- **The trap**: "We'll document it later" becomes "nobody knows how this works"
- **The cost**: 10 minutes of documentation saves 10 hours of debugging later
- **The pattern**: Documentation standards must be enforced by process, not good intentions

This challenge mirrors real engineering situations where you must balance thoroughness with time pressure, and figure out how to prevent the problem from recurring.

**You have 60 minutes. How you approach this is up to you.**
