import { Sequelize } from "sequelize";
import { dbConfig } from "../config/sequelize.js";

const { database, username, password, ...configs } = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

// Todo.initialize(sequelize);
// Todo.associate(sequelize.models);
// Todo.setupScopes(sequelize.models);

export { sequelize };
