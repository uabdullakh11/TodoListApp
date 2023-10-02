import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import getDate from "../helpers/getDate.js";
import User from "./User.js";

const { fullDate } = getDate();
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


Todo.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "userId",
  },
});


export default Todo;
