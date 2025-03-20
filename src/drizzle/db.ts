import { drizzle } from "drizzle-orm/node-postgres";
import * as Schema from "./schema";
import { env } from "@/data/env/server";

export const db = drizzle({
  Schema,
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
});
