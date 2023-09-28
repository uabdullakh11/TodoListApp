import express from "express";
import { userController } from "../controllers/index.js";
const jsonParser = express.json();
const userRouter = express.Router();

userRouter.get('/', userController.getUserById)
userRouter.put('/', jsonParser, userController.updateUser)
userRouter.delete('/', jsonParser, userController.deleteUser)

export {userRouter}