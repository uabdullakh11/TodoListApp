import getDate from "../config/getDate.js";
import fs from "fs";

const filePath = "public/todos.json";

const {currentDate} = getDate();
const getTodos = (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  const myTodos = todos.filter((todo) => todo.userId == id);
  res.send(myTodos);
};

const getTodayTodos = (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  const myTodos = todos.filter((todo) => todo.userId == id);
  myTodos.sort((a, b) => {
    if (a.date < b.date) return 1
    else return -1
  })
  console.log(myTodos[2].date.slice(0, 9)===currentDate)
  const todayTodos = myTodos.filter((item) => {item.date.slice(0, 9) === currentDate})
  res.send(todayTodos);
};
const getNewTodos = (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  const myTodos = todos.filter((todo) => todo.userId == id);
  res.send(myTodos);
};
const getPastTodos = (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  const myTodos = todos.filter((todo) => todo.userId == id);
  res.send(myTodos);
};
const getDoneTodos = (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  const myTodos = todos.filter((todo) => todo.userId == id);
  res.send(myTodos);
};
const getUndoneTodos = (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  const myTodos = todos.filter((todo) => todo.userId == id);
  res.send(myTodos);
};
const addTodo = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const [title, completed, userId, date] = [
    req.body.title,
    req.body.completed,
    req.body.userId,
    req.body.date,
  ];
  let todo = { userId, date, title, completed };

  let data = fs.readFileSync(filePath, "utf8");
  let todos = JSON.parse(data);

  const id = Math.max.apply(
    Math,
    todos.map(function (o) {
      return o.id;
    })
  );
  todos.id = id + 1;
  todos.push(todo);

  data = JSON.stringify(todos);
  fs.writeFileSync("public/todos.json", data);
  res.send(todos);
};
const deleteTodo = (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync(filePath, "utf8");
  let todos = JSON.parse(data);
  let index = -1;

  todos.forEach((item, i) => {
    if (item.id == id) {
      index = i;
    }
  });

  if (index > -1) {
    const todo = todos.splice(index, 1)[0];
    data = JSON.stringify(todos);
    fs.writeFileSync("public/todos.json", data);
    res.send(todo);
  } else {
    res.status(404).send("404");
  }
};
const updateTodo = (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const [id, title, completed, date] = [
    req.body.id,
    req.body.title,
    req.body.completed,
    req.body.date,
  ];

  let data = fs.readFileSync(filePath, "utf8");
  let todos = JSON.parse(data);
  let todo;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todo = todos[i];
      break;
    }
  }
  console.log(id);
  if (todo) {
    [todo.title, todo.completed, todo.date] = [title, completed, date];
    data = JSON.stringify(todos);
    fs.writeFileSync("public/todos.json", data);
    res.send(todo);
  } else {
    res.status(404).send(todo);
  }
};

export {getTodos, getTodayTodos, getNewTodos, getPastTodos, getDoneTodos, getUndoneTodos, addTodo, deleteTodo, updateTodo};
