import getDate from "../heplers/getDate.js";
import { paginate } from "../heplers/paginate.js";
import Todo from "../models/Todo.js";
import { Op } from "sequelize";

const { currentDate } = getDate();
const pageSize = 10;
const todos = {
  allTodosCount: 0,
  currentTodos: [],
};

const getTodos = async (req, res) => {
  const id = req.userId;
  try {
    const allTodos = await Todo.findAll({
      where: {
        userId: {
          [Op.eq]: id,
        },
      },
      order: [["date", "DESC"]],
    });
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const getTodayTodos = async (req, res) => {
  const id = req.userId;
  try {
    const allTodos = await Todo.findAll({
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
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const getNewTodos = async (req, res) => {
  const id = req.userId;
  try {
    const allTodos = await Todo.findAll({
      order: [["date", "DESC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
      },
    });
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const getPastTodos = async (req, res) => {
  const id = req.userId;
  try {
    const allTodos = await Todo.findAll({
      order: [["date", "ASC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
      },
    });
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const getDoneTodos = async (req, res) => {
  const id = req.userId;
  try {
    const allTodos = await Todo.findAll({
      order: [["date", "DESC"]],
      where: {
        [Op.and]: [{ userId: id }, { completed: true }],
      },
    });
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const getUndoneTodos = async (req, res) => {
  const id = req.userId;
  try {
    const allTodos = await Todo.findAll({
      order: [["date", "DESC"]],
      where: {
        [Op.and]: [{ userId: id }, { completed: false }],
      },
    });
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const addTodo = async (req, res) => {
  if (!req.body) return res.send('No data sent!');
  const userId = req.userId;
  const [title, completed, date] = [
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  const taskToCheck = await Todo.findOne({ where: { title } });
  if (taskToCheck) return res.send("Task already exist!");
  try {
    const newTodo = await Todo.create({
      title: title,
      date: date,
      userId: userId,
      completed: completed,
    });
    res.send(newTodo);
  } catch (e) {
    console.log(e);
  }
};
const deleteTodo = async (req, res) => {
  if (!req.params.id) return res.send('No id sent!');
  const userId = req.userId;
  const id = req.params.id;
  try {
    await Todo.destroy({
      where: {
        userId: userId,
        id: id,
      },
    });
    res.send(`Delete task ${id} successfully of user ${userId}`);
  } catch (e) {
    console.log(e);
  }
};
const updateTodo = async (req, res) => {
  if (!req.body) return res.send('No data sent!');
  const userId = req.userId;
  const [id, title, completed, date] = [
    req.body.id,
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  try {
    if (req.query.update == "title") {
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
    } else if (req.query.update == "completed") {
      await Todo.update(
        {
          completed: completed,
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
    res.send(`Update successfully`);
  } catch (e) {
    console.log(e);
  }
};

export {
  getTodos,
  getTodayTodos,
  getNewTodos,
  getPastTodos,
  getDoneTodos,
  getUndoneTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
