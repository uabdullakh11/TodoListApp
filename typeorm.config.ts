import { DataSource } from "typeorm";
import * as process from "process";
import * as dotenv from "dotenv";

dotenv.config();

export default new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  // migrations: ["src/**/**/*.migration{.ts,.js}"],
  migrations: ['src/migrations/*{.ts, .js}'],
  entities: ["src/**/**/*.entity{.ts,.js}"],
});
