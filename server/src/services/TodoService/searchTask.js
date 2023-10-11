import Todo from "../../models/Todo.js";
import { Op } from "sequelize";


const searchTask = async (id, title) => {
  try {
    const tasks = await Todo.findAll({
      where: {
        userId: {
          [Op.eq]: id,
        },
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
    });
    if (tasks.length===0) return "Don't find any tasks with this title";
    return tasks
  } catch (error) {
    throw new Error(error);
  }
};

export {searchTask}