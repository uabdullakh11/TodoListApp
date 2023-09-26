import getDate from "../config/getDate.js";
// import fs from "fs";
import Todo from "../models/Todo.js";
import { Op } from "sequelize";

// const filePath = "public/todos.json";

const { currentDate } = getDate();
const pageSize = 10;

const getTodos = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    const all = await Todo.findAll({
      where: {
        userId: {
          [Op.eq]: id,
        },
      },
      offset: (req.query.page - 1) * pageSize,
      limit: pageSize,
    });
    res.send(all);
  } catch (e) {
    console.log(e);
  }
  // const content = fs.readFileSync(filePath, "utf8");
  // const todos = JSON.parse(content);
  // const myTodos = todos.filter((todo) => todo.userId == id);
  // res.send(myTodos);
};
const getTodayTodos = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    const todayTodos = await Todo.findAll({
      order: [["createdAt", "ASC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
        date: {
          [Op.eq]: currentDate,
        },
      },
      offset: (req.query.page - 1) * pageSize,
      limit: pageSize,
    });
    res.send(todayTodos);
  } catch (e) {
    console.log(e);
  }
  // const content = fs.readFileSync(filePath, "utf8");
  // const todos = JSON.parse(content);
  // const myTodos = todos.filter((todo) => todo.userId == id);
  // myTodos.sort((a, b) => {
  //   if (a.date < b.date) return 1;
  //   else return -1;
  // });
  // const todayTodos = myTodos.filter(
  //   (item) => item.date.slice(0, 9) === currentDate
  // );
  // res.send(todayTodos);
};
const getNewTodos = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    const newTodos = await Todo.findAll({
      order: [["createdAt", "ASC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
      },
      offset: (req.query.page - 1) * pageSize,
      limit: pageSize,
    });
    res.send(newTodos);
  } catch (e) {
    console.log(e);
  }
  // const content = fs.readFileSync(filePath, "utf8");
  // const todos = JSON.parse(content);
  // const myTodos = todos.filter((todo) => todo.userId == id);
  // myTodos.sort((a, b) => {
  //   if (a.date < b.date) return 1;
  //   else return -1;
  // });
  // res.send(myTodos);
};
const getPastTodos = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  try {
    const id = req.params.id;
    const pastTodos = await Todo.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
      },
      offset: (req.query.page - 1) * pageSize,
      limit: pageSize,
    });
    res.send(pastTodos);
  } catch (e) {
    console.log(e);
  }
  // const content = fs.readFileSync(filePath, "utf8");
  // const todos = JSON.parse(content);
  // const myTodos = todos.filter((todo) => todo.userId == id);
  // myTodos.sort((a, b) => {
  //   if (a.date > b.date) return 1;
  //   else return -1;
  // });
  // res.send(myTodos);
};
const getDoneTodos = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    const doneTodos = await Todo.findAll({
      order: [["createdAt", "ASC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
        completed: {
          [Op.eq]: true,
        },
      },
      offset: (req.query.page - 1) * pageSize,
      limit: pageSize,
    });
    res.send(doneTodos);
  } catch (e) {
    console.log(e);
  }
  // const content = fs.readFileSync(filePath, "utf8");
  // const todos = JSON.parse(content);
  // const myTodos = todos.filter((todo) => todo.userId == id);
  // const doneTodos = myTodos.filter((item) => item.completed);
  // res.send(doneTodos);
};
const getUndoneTodos = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    const undoneTodos = await Todo.findAll({
      order: [["createdAt", "ASC"]],
      where: {
        userId: {
          [Op.eq]: id,
        },
        completed: {
          [Op.eq]: false,
        },
      },
      offset: (req.query.page - 1) * pageSize,
      limit: pageSize,
    });
    res.send(undoneTodos);
  } catch (e) {
    console.log(e);
  }
  // const content = fs.readFileSync(filePath, "utf8");
  // const todos = JSON.parse(content);
  // const myTodos = todos.filter((todo) => todo.userId == id);
  // const undoneTodos = myTodos.filter((item) => !item.completed);
  // res.send(undoneTodos);
};
const addTodo = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const [title, completed, userId, date] = [
    req.body.title,
    req.body.completed,
    req.body.userId,
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
  // let todo = { userId, date, title, completed };

  // let data = fs.readFileSync(filePath, "utf8");
  // let todos = JSON.parse(data);

  // const id = Math.max.apply(
  //   Math,
  //   todos.map(function (o) {
  //     return o.id;
  //   })
  // );
  // todos.id = id + 1;
  // todos.push(todo);

  // data = JSON.stringify(todos);
  // fs.writeFileSync("public/todos.json", data);
  // res.send(todos);
};
const deleteTodo = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    await Todo.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    res.send("delete");
  } catch (e) {
    console.log(e);
  }
  // let data = fs.readFileSync(filePath, "utf8");
  // let todos = JSON.parse(data);
  // let index = -1;

  // todos.forEach((item, i) => {
  //   if (item.id == id) {
  //     index = i;
  //   }
  // });

  // if (index > -1) {
  //   const todo = todos.splice(index, 1)[0];
  //   data = JSON.stringify(todos);
  //   fs.writeFileSync("public/todos.json", data);
  //   res.send(todo);
  // } else {
  //   res.status(404).send("404");
  // }
};
const updateTodo = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const [id, title, completed, date] = [
    req.body.id,
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  try {
    const updateTodo = await Todo.update(
      {
        title: title,
        completed: completed,
        date: date,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      }
    );
    res.send(updateTodo);
  } catch (e) {
    console.log(e);
  }
  //возвращает один
  // let data = fs.readFileSync(filePath, "utf8");
  // let todos = JSON.parse(data);
  // let todo;

  // for (let i = 0; i < todos.length; i++) {
  //   if (todos[i].id == id) {
  //     todo = todos[i];
  //     break;
  //   }
  // }
  // if (todo) {
  //   [todo.title, todo.completed, todo.date] = [title, completed, date];
  //   data = JSON.stringify(todos);
  //   fs.writeFileSync("public/todos.json", data);
  //   res.send(todo);
  // } else {
  //   res.status(404).send(todo);
  // }
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
