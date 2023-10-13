import Todo from "../../models/Todo.js";
import { Op } from "sequelize";

const getUserStatistic = async (id) => {
  try {
    const countAll = await Todo.count({
      where: {
        userId: id,
      },
    });
    const countDone = await Todo.count({
      where: {
        userId: id,
        completed: true,
      },
    });
    let week = new Date();
    week.setDate(week.getDate() - 7);
    const countWeekAll = await Todo.count({
      where: {
        userId: id,
        createdAt: { [Op.between]: [week, new Date()] },
      },
    });
    const countWeekDone = await Todo.count({
      where: {
        userId: id,
        completed: true,
        createdAt: { [Op.between]: [week, new Date()] },
      },
    });
    const AllTimePercant = Math.floor((countDone / countAll) * 100);
    const WeekPercant = Math.floor((countWeekDone / countWeekAll) * 100);
    return { AllTimePercant, WeekPercant };
  } catch (error) {
    throw new Error(error);
  }
};

export {getUserStatistic}