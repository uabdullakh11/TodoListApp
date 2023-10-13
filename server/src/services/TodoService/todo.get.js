import getDate from "../../helpers/getDate.js";
import Todo from "../../models/Todo.js";
import { Op } from "sequelize";

const { currentDate } = getDate();
const pageSize = 10;

const getTodos = async (id, page, filter, order, search) => {
  try {
    let recievedTodos;
    if (filter == "today") {
      recievedTodos = await Todo.findAndCountAll({
        where: {
          userId: id,
          date: {
            [Op.startsWith]: `%${currentDate}`,
          },
        },
        order: [["createdAt", "DESC"]],
        offset: pageSize * (page - 1),
        limit: pageSize,
      });
      return recievedTodos;
    } else if (filter == "search") {
      recievedTodos = await Todo.findAndCountAll({
        where: {
          userId: {
            [Op.eq]: id,
          },
          title: {
            [Op.iLike]: `%${search}%`,
          },
        },
        order: [["createdAt", "DESC"]],
        offset: pageSize * (page - 1),
        limit: pageSize,
      });
      if (recievedTodos.count === 0)
        return "Don't find any tasks with this title";
      return recievedTodos;
    }
    recievedTodos = await Todo.findAndCountAll({
      where: !filter ? { userId: id } : { userId: id, completed: filter },
      order: [["createdAt", order]],
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return recievedTodos;
  } catch (error) {
    throw new Error(error);
  }
};
export { getTodos };
