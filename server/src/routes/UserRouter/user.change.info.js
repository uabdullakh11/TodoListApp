import express from "express";
import { UserController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";
import { changeUserInfoValidate } from "../../middleware/validation.js";
import { validateRequestResult } from "../../middleware/validationResult.js";

const changeUserInfo = express.Router();

changeUserInfo.patch(
  "/",
  changeUserInfoValidate,
  validateRequestResult,
  authCheck,
  UserController.changeUserInfo
);

// export { changeUserInfo };

export default changeUserInfo;
