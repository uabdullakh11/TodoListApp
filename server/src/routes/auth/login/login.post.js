import express from "express";
import { AuthController } from "../../../controllers/index.js";
import { loginValidate } from "../../../middleware/validation.js";
import { validateRequestResult } from "../../../middleware/validationResult.js";

const login = express.Router();

login.post("/", loginValidate, validateRequestResult, AuthController.login);

export default login;
