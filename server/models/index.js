import { Sequelize } from "sequelize";
import { dbConfig } from "../config/sequelize.js";

const { database, username, password, ...configs } = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

export { sequelize };
