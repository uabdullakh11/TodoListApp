import Todo from "./Todo.js";
import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    protected: true,
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
User.hasMany(Todo, {
  as: 'todo',
  foreignKey: {
    name: 'userId',
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => console.log("Correct synchronization!"))
//   .catch((err) => console.log(err));

export default User;
