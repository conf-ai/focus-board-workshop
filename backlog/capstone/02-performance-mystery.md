# Capstone Challenge 2: "The Application Is Slow But Nobody Knows Why"

## Business Problem

Your application has become noticeably slow over the past few weeks. Users are complaining, and the product team is getting nervous. The engineering team has tried a few "obvious" optimizations, but nothing has made a meaningful difference.

**The symptoms:**

- Loading a project with 50+ tasks takes 3-4 seconds (used to be instant)
- Switching between projects feels sluggish
- Task status updates have a visible delay
- Some users report "the whole app freezes for a second" randomly
- The dev team added indexes to the database, but it didn't help

**The pressure:**

- Leadership wants this fixed before the enterprise demo next week
- Marketing can't explain why the app is slower than competitors
- Support tickets mentioning "slow" or "laggy" increased 300% this month

**Your mission:** You have 60 minutes to find the actual bottleneck and deliver a measurable performance improvement.

## Impact

- **Enterprise Deal at Risk**: Prospect cited "performance issues" as concern during trial
- **User Churn Threat**: 12% of active users reduced usage in past 3 weeks
- **Team Confidence**: Engineering team demoralized by failed optimization attempts
- **Technical Debt Perception**: Leadership questioning if architecture is fundamentally flawed
- **Competitive Vulnerability**: Competitors highlighting "lightning-fast" as differentiator

## Success Criteria (Observable Outcomes)

### Minimum Viable Success

- [ ] **Bottleneck Identified**: Clear understanding of what's actually causing slowness
- [ ] **Measured Baseline**: Concrete numbers for performance before optimization
- [ ] **Working Fix**: Implementation that addresses the identified bottleneck
- [ ] **Validated Improvement**: Measured performance after fix with clear comparison

### Full Success

- [ ] **Systematic Investigation**: Used structured diagnostic process, not random guessing
- [ ] **Evidence-Based Decisions**: Each optimization attempt backed by measurement and reasoning
- [ ] **Performance Principles**: Documented diagnostic approach and performance patterns in AGENTS.md
- [ ] **Agent System Extension**: Created diagnostic/investigative agent for future performance work

## Real-World Context

Performance issues are fundamentally different from feature requests:

- **No clear requirement**: "Make it faster" doesn't tell you what's actually slow
- **Hidden root causes**: The symptom (slow page load) might not point to the real problem
- **Multiple possible culprits**: Could be database, API, React rendering, network, or all of them
- **Measurement required**: You can't fix what you can't measure

This challenge tests: **Can you investigate problems systematically, or only implement solutions?**

## Time Allocation Guidance

- **0-20 minutes**: Investigation setup, baseline measurement, hypothesis formation
- **20-30 minutes**: Profiling and evidence gathering to identify bottleneck
- **30-45 minutes**: Targeted fix implementation
- **45-55 minutes**: Validation and measurement
- **55-60 minutes**: Documentation
