---
description: "Implement features following discovered patterns with explicit design principles (YAGNI/DRY/SRP/SoC). Use after Planner has completed discovery. (Alias for /coder)"
args:
  - name: "feature_file"
    description: "Path to the feature task file with completed Discovery Phase"
    required: true
---

Use the Task tool with subagent_type="coder" to implement the feature defined in `$1`.
