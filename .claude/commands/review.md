---
description: "Perform code review for security, performance, and quality validation"
args:
  - name: "feature_file"
    description: "Path to the feature task file with completed Implementation Phase"
    required: true
---

Use the Task tool with subagent_type="reviewer" to review the feature defined in `$1`.
