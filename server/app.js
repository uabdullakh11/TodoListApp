import express from "express";
import {todoRouter} from "./routes/todoRouter.js";
import cors from "cors";

const app = express();

const port = process.env.PORT

app.use(cors())
app.use("/api/todos", todoRouter);
app.use((req, res) => {
  res.status(404).send("Not Found")
});

app.listen(port, () => {
  console.log("Server running on localhost:5000...");
});
