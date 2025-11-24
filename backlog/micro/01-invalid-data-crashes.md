# Micro Task: Invalid Data Crashes System

## Business Problem
Users are experiencing application crashes when they submit tasks with invalid or missing information. The support team reports multiple error tickets about "something went wrong" messages that don't help users fix the problem.

## Impact
- Users lose their work and get frustrated
- Support team spends time on preventable issues  
- Application appears unreliable and unprofessional

## Success Criteria (Observable Outcomes)
- [ ] Users cannot crash the app by submitting invalid task data
- [ ] Clear, helpful error messages guide users to fix problems
- [ ] Application gracefully handles edge cases (empty titles, extremely long descriptions, etc.)
- [ ] Error handling follows the existing patterns used elsewhere in the app

## Real-World Context
This represents the common scenario where users encounter unexpected errors due to missing input validation. Your AI agents must discover the right technical approach through codebase exploration rather than following prescribed steps.