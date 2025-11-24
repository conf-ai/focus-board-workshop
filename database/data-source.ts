import { DataSource } from "typeorm";
import * as Domains from "../core/domain";
import * as Migrations from "./migrations";

// Create the DataSource instance
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_CONNECTION_STRING,
  entities: Object.values(Domains),
  migrations: Object.values(Migrations),
  synchronize: true,
  migrationsRun: true,
  logging: ["info", "error", "warn"],
});
