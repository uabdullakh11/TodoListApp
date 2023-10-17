import Todo from "../../models/Todo.js";
import { Op } from "sequelize";

const pageSize = 10;

const getTodos = async ({ id, page, filter, search }) => {
  filter.where.userId = id;
  try {
    const recievedTodos = await Todo.findAndCountAll({
      where: !search
        ? filter.where
        : {
            userId: id,
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
      order: filter.order,
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return recievedTodos;
  } catch (error) {
    throw new Error(error);
  }
};
export { getTodos };
