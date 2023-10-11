import express from "express";
import { AuthController } from "../../controllers/index.js";
import { registValidate } from "../../middleware/validation.js";
import { validateRequestResult } from "../../middleware/validationResult.js";

const register = express.Router();

register.post(
  "/register",
  registValidate,
  validateRequestResult,
  AuthController.register
);

// export { register };
export default register;
