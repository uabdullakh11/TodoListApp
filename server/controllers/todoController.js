import { TodoService } from "../services/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const getTodos = async (req, res) => {
  const id = req.userId;
  const todos = await TodoService.getTodos(id, req.query.page, req.query.filter);
  res.json(todos);
};
// const getTodayTodos = async (req, res) => {
//   const id = req.userId;
//   const todos = await TodoService.getTodayTodos(id, req.query.page);
//   res.json(todos);
// };
// const getNewTodos = async (req, res) => {
//   const id = req.userId;
//   const todos = await TodoService.getNewTodos(id, req.query.page);
//   res.json(todos);
// };
// const getPastTodos = async (req, res) => {
//   const id = req.userId;
//   const todos = await TodoService.getPastTodos(id, req.query.page);
//   res.json(todos);
// };
// const getDoneTodos = async (req, res) => {
//   const id = req.userId;
//   const todos = await TodoService.getDoneTodos(id, req.query.page);
//   res.json(todos);
// };
// const getUndoneTodos = async (req, res) => {
//   const id = req.userId;
//   const todos = await TodoService.getUndoneTodos(id, req.query.page);
//   res.json(todos);
// };
const addTodo = async (req, res) => {
  // if (!req.body) throw new BadRequest("No data sent!");
  const userId = req.userId;
  const [title, completed, date] = [
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  try {
    const result = await TodoService.addTodo(title, completed, date, userId);
    res.json(result);
  } catch (error) {
    console.log("this todoController " + error.message)
    res.status(400).send(error.message);
  }
};
const deleteTodo = async (req, res) => {
  if (!req.params.id) throw new BadRequest("No id sent!");
  const userId = req.userId;
  const id = req.params.id;
  const result = await TodoService.deleteTodo(id, userId);
  res.json(result);
};
const updateTodo = async (req, res) => {
  // if (!req.body) return res.status(400).send("No data sent!");
  const userId = req.userId;
  const [id, title, completed, date] = [
    req.body.id,
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  try {
    const result = await TodoService.updateTodo(
      id,
      userId,
      title,
      completed,
      date,
      req.query.update
    );
    res.json(result);
  }catch (error) {
    res.status(400).send(error.message);
  }
};

export {
  getTodos,
  // getTodayTodos,
  // getNewTodos,
  // getPastTodos,
  // getDoneTodos,
  // getUndoneTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
