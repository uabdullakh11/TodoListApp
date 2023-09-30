import express from "express";
import { userController } from "../controllers/index.js";
import { authCheck } from "../heplers/authCheck.js";

const jsonParser = express.json();
const userRouter = express.Router();

userRouter.get('/', authCheck, userController.getUserById)
userRouter.delete('/', jsonParser, authCheck, userController.deleteUser)
userRouter.put('/avatar', authCheck, userController.createUserAvatar)
userRouter.patch('/password', authCheck, userController.changeUserPassword)
userRouter.patch('/username', authCheck, userController.changeUserLogin)
userRouter.patch('/email', authCheck, userController.createUserEmail)

export {userRouter}