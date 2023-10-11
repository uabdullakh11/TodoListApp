import { Router } from "express";
import getUserById from "./getUserById.js";
import getUserStatistic  from "./getUserStatistic.js";
import changeUserInfo from "./changeUserInfo.js";
import changeUserPassword from "./changeUserPassword.js";
import createUserAvatar from "./createUserAvatar.js";
import deleteUser  from "./deleteUser.js";

const UserRouter = Router();

UserRouter.use( getUserById, getUserStatistic, changeUserInfo, changeUserPassword, createUserAvatar, deleteUser);

export default UserRouter;