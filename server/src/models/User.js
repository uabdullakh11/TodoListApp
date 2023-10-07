import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import { v4 as uuid } from "uuid";
import Token from "./Token.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
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
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "/static/avatars/person-logo.svg",
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

User.hasOne(Token, {
  as: "resfreshToken",
  foreignKey: {
    name: "userId",
  },
});
Token.belongsTo(User)

User.beforeCreate(async (user, options) => {
  user.id = uuid();
});

// User.hasMany(Todo, {
//   as: "todo",
//   foreignKey: {
//     name: "userId",
//   },
// });
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
