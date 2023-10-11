import express from "express";
import { UserController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";
import { passwordValidate } from "../../middleware/validation.js";
import { validateRequestResult } from "../../middleware/validationResult.js";

const changeUserPassword = express.Router();

changeUserPassword.patch(
  "/password",
  passwordValidate,
  validateRequestResult,
  authCheck,
  UserController.changeUserPassword
);

// export { changeUserPassword };

export default changeUserPassword;
