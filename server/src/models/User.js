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

User.hasMany(Token, {
  as: "resfreshToken",
  foreignKey: {
    name: "userId",
  },
});
Token.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "userId",
  },
});

User.beforeCreate(async (user) => {
  user.id = uuid();
});

export default User;
