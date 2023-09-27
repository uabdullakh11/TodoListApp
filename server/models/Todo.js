import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import getDate from "../heplers/getDate.js";

const { fullDate} = getDate();
const Todo = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: fullDate,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'users',
        schema: 'schema'
      },
      key: 'id'
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
});
// sequelize
//   .sync({force: false})
//   .then(() => console.log('Correct synchronization!'))
//   .catch((err) => console.log(err));

export default Todo;
