import express from "express";
import { todoRouter } from "./routes/todoRouter.js";
import { userRouter } from "./routes/userRouter.js";
import cors from "cors";
import { sequelize } from "./models/index.js";
import { config } from "./config/index.js";
import morgan from "morgan";
import { authRouter } from "./routes/authRouter.js";

const app = express();

const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Database module initialized");
  } catch (error) {
    console.log(error);
  }
}
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on localhost:${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
