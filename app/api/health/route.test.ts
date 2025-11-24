import { GET } from "./route";

describe("/api/health", () => {
  it("should return 200 status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("should return health check data", async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty("status");
    expect(data).toHaveProperty("timestamp");
    expect(data).toHaveProperty("uptime");
    expect(data).toHaveProperty("environment");
  });

  it("should return status as 'ok'", async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.status).toBe("ok");
  });

  it("should return a valid ISO timestamp", async () => {
    const response = await GET();
    const data = await response.json();

    const timestamp = new Date(data.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.toISOString()).toBe(data.timestamp);
  });

  it("should return uptime as a number", async () => {
    const response = await GET();
    const data = await response.json();

    expect(typeof data.uptime).toBe("number");
    expect(data.uptime).toBeGreaterThanOrEqual(0);
  });

  it("should return environment information", async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.environment).toBeDefined();
    expect(typeof data.environment).toBe("string");
  });
});
