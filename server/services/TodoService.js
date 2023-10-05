import getDate from "../helpers/getDate.js";
import { paginate } from "../helpers/paginate.js";
import Todo from "../models/Todo.js";
import { Op } from "sequelize";
import pkg from "http-errors";
const { BadRequest, createHttpError } = pkg;

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
          order: [["date", "DESC"]],
        });
        break;
      case "today":
        tasks = await Todo.findAll({
          order: [["date", "DESC"]],
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
          order: [["date", "DESC"]],
          where: {
            userId: {
              [Op.eq]: id,
            },
          },
        });
        break;
      case "past":
        tasks = await Todo.findAll({
          order: [["date", "ASC"]],
          where: {
            userId: {
              [Op.eq]: id,
            },
          },
        });
        break;
      case "done":
        tasks = await Todo.findAll({
          order: [["date", "DESC"]],
          where: {
            [Op.and]: [{ userId: id }, { completed: true }],
          },
        });
        break;
      case "undone":
        tasks = await Todo.findAll({
          order: [["date", "DESC"]],
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

const addTodo = async (title, completed, date, id) => {
  const taskToCheck = await Todo.findOne({ where: { title, userId: id } });
  if (taskToCheck) throw new BadRequest("Task already exist!");
  //   if (taskToCheck) throw createHttpError(400, "Task already exist!");
  try {
    const newTodo = await Todo.create({
      title: title,
      date: date,
      userId: id,
      completed: completed,
    });
    return newTodo;
  } catch (error) {
    throw new BadRequest(error);
  }
};
const deleteTodo = async (id, userId) => {
  try {
    await Todo.destroy({
      where: {
        userId: userId,
        id: id,
      },
    });
    return `Delete task ${id} successfully of user ${userId}`;
  } catch (error) {
    throw new Error(error);
  }
};
const updateTodo = async (id, userId, title, completed, date, type) => {
  try {
    if (type == "title") {
      const taskToCheck = await Todo.findOne({
        where: { title, userId: userId },
      });
      if (taskToCheck)
        throw new BadRequest("Task with this title already exist!");
      await Todo.update(
        {
          title: title,
          date: date,
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
    } else if (type == "completed") {
      await Todo.update(
        {
          completed: !completed,
          date: date,
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
    }
    return `Update successfully`;
  } catch (error) {
    throw new BadRequest(error);
  }
};
export {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
