import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import getDate from "../helpers/getDate.js";
import User from "./User.js";
import { v4 as uuid } from 'uuid';

const { fullDate } = getDate();
const Todo = sequelize.define("tasks", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
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

Todo.beforeCreate(async (todo) => {
  todo.id = uuid()
});

Todo.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "userId",
  },
  // onDelete: 'CASCADE',
});

User.hasMany(Todo, {
  as: "todo",
  foreignKey: {
    name: "userId",
  },
});

export default Todo;
