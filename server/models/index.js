import { Sequelize } from "sequelize";
import { dbConfig } from "../config/sequelize.js";
// import User from "./User.js";
// import Todo from "./Todo.js";

const { database, username, password, ...configs } = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

// User.initialize(sequelize);
// User.associate(sequelize.models);

// Todo.initialize(sequelize);
// Todo.associate(sequelize.models);


//   User.hasMany(Todo, {
//     as: 'todo',
//     foreignKey: {
//       name: 'userId',
//     },
//   });

export { sequelize };
