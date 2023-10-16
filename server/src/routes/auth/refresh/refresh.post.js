import express from "express";
import { AuthController } from "../../../controllers/index.js";
import { tokenValidate } from "../../../middleware/validation.js";
import { validateRequestResult } from "../../../middleware/validationResult.js";

const refresh = express.Router();

refresh.post(
  "/",
  tokenValidate,
  validateRequestResult,
  AuthController.refreshToken
);

// export { refresh };

export default refresh;
