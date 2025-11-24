// scripts/setup.js
/* eslint-disable @typescript-eslint/no-require-imports */

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${args.join(" ")}`);
  }
}

function checkNodeVersion() {
  const [major] = process.versions.node.split(".");
  const majorNum = parseInt(major, 10);

  const requiredMajor = 22;

  console.log(`Detected Node version: ${process.versions.node}`);

  if (Number.isNaN(majorNum) || majorNum < requiredMajor) {
    console.error(`Node ${requiredMajor} or higher is required. Please upgrade your Node version.`);
    process.exit(1);
  }
}

function checkDocker() {
  console.log("Checking Docker availability...");

  const result = spawnSync("docker", ["ps"], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });

  if (result.error || result.status !== 0) {
    console.error(
      "Docker does not seem to be running. Please start Docker Desktop or your Docker service and try again."
    );
    process.exit(1);
  }

  console.log("Docker is available.");
}

function setupEnvironment() {
  const envPath = path.join(__dirname, "..", ".env");
  const envExamplePath = path.join(__dirname, "..", ".env.example");

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    console.log("Creating .env file from .env.example...");
    fs.copyFileSync(envExamplePath, envPath);
    console.log(".env file created successfully.");
  } else if (fs.existsSync(envPath)) {
    console.log(".env file already exists, skipping...");
  } else {
    console.warn(
      "Warning: .env.example not found. You may need to configure environment variables manually."
    );
  }
}

function waitForPostgres() {
  console.log("Waiting for PostgreSQL to be ready...");
  const maxAttempts = 30;

  for (let i = 0; i < maxAttempts; i++) {
    const result = spawnSync(
      "docker",
      [
        "compose",
        "-f",
        "infra/docker-compose.yml",
        "exec",
        "-T",
        "db",
        "pg_isready",
        "-U",
        "postgres",
      ],
      { stdio: "ignore", shell: process.platform === "win32" }
    );

    if (result.status === 0) {
      console.log("PostgreSQL is ready.");
      return;
    }

    // Wait 1 second between attempts
    process.stdout.write(".");
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
  }

  console.error("\nPostgreSQL did not become ready in time.");
  console.error(
    "Try running 'docker compose -f infra/docker-compose.yml logs db' to see what went wrong."
  );
  process.exit(1);
}

function main() {
  console.log("Starting workshop environment setup...\n");

  checkNodeVersion();
  checkDocker();

  console.log("\nStep 1. Installing npm dependencies...");
  run("npm", ["install"]);

  console.log("\nStep 2. Setting up environment configuration...");
  setupEnvironment();

  console.log("\nStep 3. Starting Docker services (PostgreSQL + MCP)...");
  run("docker", ["compose", "-f", "infra/docker-compose.yml", "up", "-d"]);

  console.log("\nStep 4. Waiting for PostgreSQL to initialize...");
  waitForPostgres();

  console.log("\n✅ Setup complete! You are ready for the workshop.");
  console.log("\nNext steps:");
  console.log("  1. Run 'npm run dev' to start the development server");
  console.log("  2. TypeORM will automatically create database tables on first connection");
  console.log("  3. Visit http://localhost:3000 to see your application");
}

main();
