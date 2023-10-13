import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import { v4 as uuid } from 'uuid';

const Token = sequelize.define(
  "refreshToken",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      defaultValue:  DataTypes.NOW,
      allowNull: false,
    //   defaultValue: 86400, //1 day
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);


Token.beforeCreate(async (token) => {
  token.id = uuid()
});

Token.prototype.verifyExpiration = (token) => {
  return token.expiryDate.getTime()<= Math.floor(new Date().getTime() / 1000) - 86400
};
export default Token;
