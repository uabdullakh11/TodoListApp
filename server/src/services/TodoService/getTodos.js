import getDate from "../../helpers/getDate.js";
import Todo from "../../models/Todo.js";
import { Op } from "sequelize";

const { currentDate } = getDate();
const pageSize = 10;

const getTodos = async (id, page, filter, order) => {
  try {
    let recievedTodos;
    filter == "today"
      ? (recievedTodos = await Todo.findAndCountAll({
          where: {
            userId: id,
            date: {
              [Op.startsWith]: `%${currentDate}`,
            },
          },
          order: [["createdAt", "DESC"]],
          offset: pageSize * (page - 1),
          limit: pageSize,
        }))
      : (recievedTodos = await Todo.findAndCountAll({
          where: !filter ? { userId: id } : { userId: id, completed: filter },
          order: [["createdAt", order]],
          offset: pageSize * (page - 1),
          limit: pageSize,
        }));
    return recievedTodos;
  } catch (error) {
    throw new Error(error);
  }
};
export { getTodos };
