import getDate from "../../helpers/getDate.js";
import { paginate } from "../../helpers/paginate.js";
import Todo from "../../models/Todo.js";
import { Op } from "sequelize";

const { currentDate } = getDate();
const pageSize = 10;
const todos = {
  allTodosCount: 0,
  currentTodos: [],
};

const getTodos = async (id, page, filter) => {
  try {
    let tasks = [];
    switch (filter) {
      case "all":
        tasks = await Todo.findAll({
          where: {
            userId: {
              [Op.eq]: id,
            },
          },
          order:[["createdAt", "DESC"]],
        });
        break;
      case "today":
        tasks = await Todo.findAll({
          order:[["createdAt", "DESC"]],
          where: {
            userId: {
              [Op.eq]: id,
            },
            date: {
              [Op.startsWith]: `%${currentDate}`,
            },
          },
        });
        break;
      case "new":
        tasks = await Todo.findAll({
          order:[["createdAt", "DESC"]],
          where: {
            userId: {
              [Op.eq]: id,
            },
          },
        });
        break;
      case "past":
        tasks = await Todo.findAll({
          order:[["createdAt", "ASC"]],
          where: {
            userId: {
              [Op.eq]: id,
            },
          },
        });
        break;
      case "done":
        tasks = await Todo.findAll({
          order:[["createdAt", "DESC"]],
          where: {
            [Op.and]: [{ userId: id }, { completed: true }],
          },
        });
        break;
      case "undone":
        tasks = await Todo.findAll({
          order:[["createdAt", "DESC"]],
          where: {
            [Op.and]: [{ userId: id }, { completed: false }],
          },
        });
        break;
      default:
    }
    todos.allTodosCount = tasks.length;
    todos.currentTodos = paginate(tasks, page, pageSize);
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};
export {getTodos}
