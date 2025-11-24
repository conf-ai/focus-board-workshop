/**
 * Next.js Instrumentation Hook
 *
 * This file is called once when a new Next.js server instance is initiated.
 * Perfect for one-time initialization tasks like database connections.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
 */

export async function register() {
  // Only initialize database in Node.js runtime (TypeORM doesn't work in Edge runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initializeDatabase } = await import("./database/init");
    await initializeDatabase();
  }
}
