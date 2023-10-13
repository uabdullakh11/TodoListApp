import { Router } from "express";
import getUserById from "./user.get.js";
import getUserStatistic  from "./user.get.statistic.js";
import changeUserInfo from "./user.change.info.js";
import changeUserPassword from "./user.change.password.js";
import createUserAvatar from "./user.create.avatar.js";
import deleteUser  from "./user.delete.js";

const UserRouter = Router();

UserRouter.use( getUserById, getUserStatistic, changeUserInfo, changeUserPassword, createUserAvatar, deleteUser);

export default UserRouter;