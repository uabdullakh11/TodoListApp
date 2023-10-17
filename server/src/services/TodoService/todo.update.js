import Todo from "../../models/Todo.js";
import { Op } from "sequelize";
import pkg from "http-errors";
const { BadRequest } = pkg;

const updateTodo = async (id, userId, title, completed, date) => {
  try {
    const taskToCheck = await Todo.findOne({
      where: {
        title,
        userId,
        id: {
          [Op.not]: id,
        },
      },
    });

    if (taskToCheck)
      throw new BadRequest("Task with this title already exist!");

    await Todo.update(
      {
        title: title,
        date: date,
        completed,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
          userId: {
            [Op.eq]: userId,
          },
        },
      }
    );
    return `Update successfully`;
  } catch (error) {
    throw new BadRequest(error);
  }
};
export { updateTodo };
