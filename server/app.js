import express from "express";
import {todoRouter} from "./routes/todoRouter.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use("/api/todos", todoRouter);
app.use((req, res) => {
  res.status(404).send("Not Found")
});

app.listen(5000, () => {
  console.log("Server running on localhost:5000...");
});
