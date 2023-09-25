const express = require("express");
const app = express();
const todoRouter = require("./routes/todoRouter.js");

app.use("/api/todos", todoRouter);
app.use((req, res) => {
  res.status(404).send("Not Found")
});

// const fs = require("fs");
// app.use(express.static(__dirname + "/public"));
// const jsonParser = express.json();
// const filePath = "public/todos.json";
// app.get("/api/todos", (req, res) => {
//   const content = fs.readFileSync(filePath, "utf8");
//   const todos = JSON.parse(content);
//   res.send(todos);
// });
// app.post("/api/todos", jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const [title, completed, userId, date] = [
//     req.body.title,
//     req.body.completed,
//     req.body.userId,
//     req.body.date,
//   ];
//   let todo = { userId, date, title, completed };

//   let data = fs.readFileSync(filePath, "utf8");
//   let todos = JSON.parse(data);

//   const id = Math.max.apply(
//     Math,
//     todos.map(function (o) {
//       return o.id;
//     })
//   );
//   todos.id = id + 1;
//   todos.push(todo);

//   data = JSON.stringify(todos);
//   fs.writeFileSync("public/todos.json", data);
//   res.send(todos);
// });
// app.delete("/api/todos/:id", (req, res) => {
//   const id = req.params.id;
//   let data = fs.readFileSync(filePath, "utf8");
//   let todos = JSON.parse(data);
//   let index = -1;

//   todos.forEach((item, i) => {
//     if (item.id == id) {
//       index = i;
//     }
//   });

//   if (index > -1) {
//     const todo = todos.splice(index, 1)[0];
//     data = JSON.stringify(todos);
//     fs.writeFileSync("public/todos.json", data);
//     res.send(todo);
//   } else {
//     res.status(404).send("404");
//   }
// });
// app.put("/api/todos", jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);

//   const [id, title, completed, date] = [
//     req.body.id,
//     req.body.title,
//     req.body.completed,
//     req.body.date,
//   ];

//   let data = fs.readFileSync(filePath, "utf8");
//   let todos = JSON.parse(data);
//   let todo;

//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].id == id) {
//       todo = todos[i];
//       break;
//     }
//   }
//   console.log(id);
//   if (todo) {
//     [todo.title, todo.completed, todo.date] = [title, completed, date];
//     data = JSON.stringify(todos);
//     fs.writeFileSync("public/todos.json", data);
//     res.send(todo);
//   } else {
//     res.status(404).send(todo);
//   }
// });

app.listen(5000, () => {
  console.log("Server running on localhost:5000...");
});
