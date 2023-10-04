import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
const Token = sequelize.define(
  "refreshToken",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      defaultValue:  DataTypes.NOW,
    //   defaultValue: 86400, //1 day
    },
  },
  {
    freezeTableName: true,
  }
);
Token.prototype.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};
export default Token;
