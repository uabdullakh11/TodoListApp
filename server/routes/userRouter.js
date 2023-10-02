import express from "express";
import { userController } from "../controllers/index.js";
import { authCheck } from "../helpers/authCheck.js";
import { imgUploader } from "../utils/multer.js";

const userRouter = express.Router();

userRouter.get('/', authCheck, userController.getUserById)
userRouter.get('/statistic', authCheck, userController.getUserStatistic)
userRouter.delete('/', authCheck, userController.deleteUser)
userRouter.put('/avatar', authCheck, imgUploader,  userController.createUserAvatar)
userRouter.patch('/password', authCheck, userController.changeUserPassword)
userRouter.patch('/', authCheck, userController.changeUserInfo)

export {userRouter}