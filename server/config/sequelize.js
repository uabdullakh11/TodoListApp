export const dbConfig = {
  username: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "user",
  database: process.env.PGDATABASE || "test",
  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || 5432, 10),
  dialect: "postgres",
  logging: false,
};

// sequelize cli required environments
export const production = dbConfig;
export const development = dbConfig;
