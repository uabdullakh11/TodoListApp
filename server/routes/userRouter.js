import express from "express";
import { userController } from "../controllers/index.js";
import { authCheck } from "../heplers/authCheck.js";

const jsonParser = express.json();
const userRouter = express.Router();

userRouter.get('/', authCheck, userController.getUserById)
userRouter.put('/', jsonParser, authCheck, userController.updateUser)
userRouter.delete('/', jsonParser, authCheck, userController.deleteUser)

export {userRouter}