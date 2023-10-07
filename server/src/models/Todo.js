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

Todo.beforeCreate(async (todo, options) => {
  todo.id = uuid()
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
