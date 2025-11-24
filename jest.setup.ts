/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";

// Polyfill for Next.js API routes
import { TextDecoder, TextEncoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock Headers
if (typeof Headers === "undefined") {
  global.Headers = class Headers {
    private headers: Map<string, string>;

    constructor(init?: any) {
      this.headers = new Map();
      if (init) {
        if (init instanceof Headers) {
          init.forEach((value: string, key: string) => {
            this.headers.set(key.toLowerCase(), value);
          });
        } else if (typeof init === "object") {
          Object.entries(init).forEach(([key, value]) => {
            this.headers.set(key.toLowerCase(), String(value));
          });
        }
      }
    }

    append(name: string, value: string) {
      const existing = this.headers.get(name.toLowerCase());
      if (existing) {
        this.headers.set(name.toLowerCase(), `${existing}, ${value}`);
      } else {
        this.headers.set(name.toLowerCase(), value);
      }
    }

    delete(name: string) {
      this.headers.delete(name.toLowerCase());
    }

    get(name: string) {
      return this.headers.get(name.toLowerCase()) || null;
    }

    has(name: string) {
      return this.headers.has(name.toLowerCase());
    }

    set(name: string, value: string) {
      this.headers.set(name.toLowerCase(), value);
    }

    forEach(callback: (value: string, key: string) => void) {
      this.headers.forEach((value, key) => callback(value, key));
    }

    entries() {
      return this.headers.entries();
    }

    keys() {
      return this.headers.keys();
    }

    values() {
      return this.headers.values();
    }

    [Symbol.iterator]() {
      return this.headers.entries();
    }
  } as any;
}

// Mock Request
if (typeof Request === "undefined") {
  global.Request = class Request {
    url: string;
    method: string;
    headers: Headers;
    body: any;

    constructor(input: string, init?: any) {
      this.url = input;
      this.method = init?.method || "GET";
      this.headers = new Headers(init?.headers);
      this.body = init?.body;
    }
  } as any;
}

// Mock Response
if (typeof Response === "undefined") {
  global.Response = class Response {
    body: any;
    status: number;
    statusText: string;
    headers: Headers;
    ok: boolean;

    constructor(body?: any, init?: any) {
      this.body = body;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || "";
      this.headers = new Headers(init?.headers);
      this.ok = this.status >= 200 && this.status < 300;
    }

    static json(data: any, init?: any) {
      const body = JSON.stringify(data);
      return new Response(body, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
        },
      });
    }

    async json() {
      return JSON.parse(this.body);
    }

    async text() {
      return this.body;
    }
  } as any;
}

// Mock fetch globally
global.fetch = jest.fn();
