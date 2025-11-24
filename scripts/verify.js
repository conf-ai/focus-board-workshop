// scripts/verify.js
/* eslint-disable @typescript-eslint/no-require-imports */

const { spawnSync } = require("child_process");

function run(command, args, stepName) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    console.error(`\n❌ ${stepName} failed with error:`, result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`\n❌ ${stepName} failed.`);
    process.exit(1);
  }

  console.log(`✅ ${stepName} passed.\n`);
}

function main() {
  console.log("Running verification checks...\n");

  console.log("1. Linting...");
  run("npm", ["run", "lint"], "Linting");

  console.log("2. Type checking...");
  run("npm", ["run", "tsc:check"], "Type checking");

  console.log("3. Running tests...");
  run("npm", ["test"], "Tests");

  console.log("✅ All checks passed successfully!");
}

main();
