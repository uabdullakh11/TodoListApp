import express from "express";
import { userController } from "../controllers/index.js";
import { authCheck } from "../middleware/authCheck.js";
import { imgUploader } from "../middleware/multer.js";
import {
  changeUserInfoValidate,
  passwordValidate,
} from "../middleware/validation.js";
import { validateRequestResult } from "../middleware/validationResult.js";

const userRouter = express.Router();

userRouter.get("/", authCheck, userController.getUserById);
userRouter.get("/statistic", authCheck, userController.getUserStatistic);
userRouter.delete("/", authCheck, userController.deleteUser);
userRouter.put(
  "/avatar",
  authCheck,
  imgUploader,
  userController.createUserAvatar
);
userRouter.patch(
  "/password",
  passwordValidate,
  validateRequestResult,
  authCheck,
  userController.changeUserPassword
);
userRouter.patch(
  "/",
  changeUserInfoValidate,
  validateRequestResult,
  authCheck,
  userController.changeUserInfo
);

export { userRouter };
