import { Router } from "express";

import AuthRouter from "./AuthRouter/index.js";
import UserRouter from "./UserRouter/index.js";
import TodoRouter from "./TodoRouter/index.js";

const rootRouter = Router();

rootRouter.use("/api/users", UserRouter);
rootRouter.use("/api/todos", TodoRouter);
rootRouter.use("/api/auth", AuthRouter);

export default rootRouter;
