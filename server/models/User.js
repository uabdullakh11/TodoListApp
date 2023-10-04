import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import Todo from "./Todo.js";
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
  avatar:{
    type: DataTypes.STRING,
    defaultValue: "/static/avatars/person-logo.svg"
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
// sequelize
//   .sync({ force: false })
//   .then(() =>{
//     User.hasMany(Todo, {
//       as: 'todo',
//       foreignKey: {
//         name: 'userId',
//       },
//     });
//     console.log("Synchronized tables");
//   })
//   .catch((err) => console.log(err));

export default User;
