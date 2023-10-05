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

// Todo.prototype.getStatistic = function (id) {
//   try {
//     const countAll = this.count({
//       where: {
//         userId: id,
//       },
//     });
//     const countDone = this.count({
//       where: {
//         userId: id,
//         completed: true,
//       },
//     });
//     let week = new Date();
//     week.setDate(week.getDate() - 7);
//     const countWeekAll = rhis.count({
//       where: {
//         userId: id,
//         createdAt: { [Op.between]: [week, new Date()] },
//       },
//     });
//     const countWeekDone = this.count({
//       where: {
//         userId: id,
//         completed: true,
//         createdAt: { [Op.between]: [week, new Date()] },
//       },
//     });
//     const AllTimePercant = Math.floor((countDone / countAll) * 100);
//     const WeekPercant = Math.floor((countWeekDone / countWeekAll) * 100);
//     return { AllTimePercant, WeekPercant };
//   } catch (err) {
//     console.log(err);
//   }
// };

Todo.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "userId",
  },
});

User.hasMany(Todo, {
  as: "todo",
  foreignKey: {
    name: "userId",
  },
});

export default Todo;
