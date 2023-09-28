import getDate from "../heplers/getDate.js";
import { paginate } from "../heplers/paginate.js";
import Todo from "../models/Todo.js";
import { Op } from "sequelize";
import { config } from "../config/index.js";
import { verifyToken } from "../utils/auth.js";

const { currentDate } = getDate();
const pageSize = 10;
const todos = {
  allTodosCount: 0,
  currentTodos: [],
};

const getTodos = async (req, res) => {
  // if (!req.params.id) return res.sendStatus(400);
  // const id = req.params.id;
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const id = authUser.id;
  try {
    // todos.allTodos = await Todo.findAll({
    //   where: {
    //     userId: {
    //       [Op.eq]: id,
    //     },
    //   },
    //   order: [["id"]],
    // })
    // todos.currentTodos = await Todo.findAll({
    //   where: {
    //     userId: {
    //       [Op.eq]: id,
    //     },
    //   },
    //   order: [["id"]],
    //   offset: (req.query.page - 1) * pageSize,
    //   limit: pageSize,
    // });
    
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
  // if (!req.params.id) return res.sendStatus(400);
  // const id = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const id = authUser.id;
  try {
    const allTodos = await Todo.findAll({
      order: [["date", "ASC"]],
      where: {
        // [Op.and]: [{ userId: id }, { date: currentDate }],
        userId: {
          [Op.eq]: id,
        },
        date: {
          [Op.startsWith]: `%${currentDate}`,
        },
      },
    });
    // todayTodos.currentTodos = await Todo.findAll({
    //   order: [["createdAt", "ASC"]],
    //   where: {
    //     // [Op.and]: [{ userId: id }, { date: currentDate }],
    //     userId: {
    //       [Op.eq]: id,
    //     },
    //     date: {
    //       [Op.startsWith]: `%${currentDate}`,
    //     },
    //   },
    //   offset: (req.query.page - 1) * pageSize,
    //   limit: pageSize,
    // });
    todos.allTodosCount = allTodos.length;
    todos.currentTodos = paginate(allTodos, req.query.page, pageSize);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
};
const getNewTodos = async (req, res) => {
  // if (!req.params.id) return res.sendStatus(400);
  // const id = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const id = authUser.id;
  try {
    // const newTodos = await Todo.findAll({
    //   order: [["createdAt", "ASC"]],
    //   where: {
    //     userId: {
    //       [Op.eq]: id,
    //     },
    //   },
    //   offset: (req.query.page - 1) * pageSize,
    //   limit: pageSize,
    // });
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
  // if (!req.params.id) return res.sendStatus(400);
  // const id = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const id = authUser.id;
  try {
    // const pastTodos = await Todo.findAll({
    //   order: [["createdAt", "DESC"]],
    //   where: {
    //     userId: {
    //       [Op.eq]: id,
    //     },
    //   },
    //   offset: (req.query.page - 1) * pageSize,
    //   limit: pageSize,
    // });
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
  // if (!req.params.id) return res.sendStatus(400);
  // const id = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const id = authUser.id;
  try {
    // const doneTodos = await Todo.findAll({
    //   order: [["createdAt", "ASC"]],
    //   where: {
    //     [Op.and]: [{ userId: id }, { completed: true }],
    //     // userId: {
    //     //   [Op.eq]: id,
    //     // },
    //     // completed: {
    //     //   [Op.eq]: true,
    //     // },
    //   },
    //   offset: (req.query.page - 1) * pageSize,
    //   limit: pageSize,
    // });
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
  // if (!req.params.id) return res.sendStatus(400);
  // const id = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const id = authUser.id;
  try {
    // const undoneTodos = await Todo.findAll({
    //   order: [["createdAt", "ASC"]],
    //   where: {
    //     [Op.and]: [{ userId: id }, { completed: false }],
    //     // userId: {
    //     //   [Op.eq]: id,
    //     // },
    //     // completed: {
    //     //   [Op.eq]: false,
    //     // },
    //   },
    //   offset: (req.query.page - 1) * pageSize,
    //   limit: pageSize,
    // });
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
  if (!req.body) return res.sendStatus(400);
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const userId = authUser.id;
  // const [title, completed, userId, date] = [
  //   req.body.title,
  //   req.body.completed,
  //   req.body.userId,
  //   req.body.date,
  // ];
  const [title, completed, date] = [
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
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
  // if (!req.params.id || !req.body) return res.sendStatus(400);
  if (!req.params.id) return res.sendStatus(400);
  // const userId = req.params.id;
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const userId = authUser.id;
  const id = req.params.id;
  try {
    await Todo.destroy({
      where: {
        userId: userId,
        id: id,
        // [Op.and]: [{ userId: id }, { id: id }],
        // userId: {
        //   [Op.eq]: userId,
        // },
        // id: {
        //   [Op.eq]: id,
        // },
      },
    });
    res.send(`Delete task ${id} successfully of user ${userId}`);
  } catch (e) {
    console.log(e);
  }
};
const updateTodo = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7);
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  const userId = authUser.id;
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
    res.send(`Update title successfully`);
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
