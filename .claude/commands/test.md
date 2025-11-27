---
description: "Verify business value delivery and user experience quality. Use after Coder has completed implementation. (Alias for /tester)"
args:
  - name: "feature_file"
    description: "Path to the feature task file with completed Implementation Phase"
    required: true
---

Use the Task tool with subagent_type="tester" to test the feature defined in `$1`.
