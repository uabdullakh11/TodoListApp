import express from "express";
import { authController } from "../controllers/index.js";
import {loginValidate, registValidate, tokenValidate} from "../middleware/validation.js"
import { validateRequestResult } from "../middleware/validationResult.js";

const authRouter = express.Router();

authRouter
  .post("/login", loginValidate, validateRequestResult, authController.login)
  .post("/register", registValidate, validateRequestResult, authController.register)
  .post('/refresh', tokenValidate,validateRequestResult, authController.refreshToken);

export { authRouter };
