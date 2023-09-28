import express from "express";
import {authController} from '../controllers/index.js';

const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

export {authRouter}