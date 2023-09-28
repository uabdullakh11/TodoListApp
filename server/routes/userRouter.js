import express from "express";
import { userController } from "../controllers/index.js";
const jsonParser = express.json();
const userRouter = express.Router();

userRouter.get('/', userController.getUserById)
// userRouter.post('/', jsonParser, userController.createUser)
userRouter.delete('/:id', jsonParser, userController.deleteUser)

export {userRouter}