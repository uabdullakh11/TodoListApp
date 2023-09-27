import express from "express";
import { userController } from "../controllers/index.js";
const jsonParser = express.json();
const userRouter = express.Router();

userRouter.post('/', jsonParser, userController.createUser)
userRouter.delete('/', jsonParser, userController.deleteUser)

export {userRouter}