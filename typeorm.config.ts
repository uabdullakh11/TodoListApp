import { DataSource } from "typeorm";
import * as process from "process";
import * as dotenv from "dotenv";
import { join } from "path";

console.log(join(__dirname, '/src/**/entity/', '*.entity.{ts,js}'))
dotenv.config();
export default new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, 'src/**/entity/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'src/migrations', '*.{ts,js}')],
  migrationsTableName: "migrations",
});
