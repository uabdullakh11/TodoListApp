import express from "express";
import { AuthController } from "../../../controllers/index.js";
import { tokenValidate } from "../../../middleware/validation.js";
import { validateRequestResult } from "../../../middleware/validationResult.js";

const logout = express.Router();

logout.post(
  "/",
  tokenValidate,
  validateRequestResult,
  AuthController.logout
);

// export { register };
export default logout;
