import { AppDataSource } from "./data-source";

let isInitialized = false;

/**
 * Initialize the database connection
 * This is called once at application startup via instrumentation.ts
 * Safe to call multiple times - will only initialize once
 */
export async function initializeDatabase(): Promise<void> {
  if (isInitialized) {
    console.log("📦 Database already initialized - skipping");
    return;
  }

  try {
    if (!AppDataSource.isInitialized) {
      console.log("🔌 Initializing database connection...");
      await AppDataSource.initialize();
      console.log("✅ Database connection initialized successfully");
      isInitialized = true;
    }
  } catch (error) {
    console.error("❌ Error during database initialization:", error);
    throw error;
  }
}

export const isDatabaseInitialized = (): boolean => isInitialized;

/**
 * Close the database connection
 * Useful for cleanup in tests or graceful shutdown
 */
export async function closeDatabase(): Promise<void> {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    isInitialized = false;
    console.log("✅ Database connection closed");
  }
}

/**
 * Get the initialized DataSource
 * Throws if not initialized
 */
export function getDataSource() {
  if (!AppDataSource.isInitialized) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return AppDataSource;
}
