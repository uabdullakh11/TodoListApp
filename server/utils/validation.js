import { body } from "express-validator";
import User from "../models/User.js";

export const userDataValidate = [
  body("login")
    .exists({ checkFalsy: true })
    .withMessage("Login is required")
    .isString()
    .withMessage("Login should be string")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { value } });
      if (existingUser) {
        throw new Error("A user already exists with this login address!");
      }
    }),
  ,
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
  body("email").exists().isEmail().withMessage("Provide valid email"),
];

export const taskDataValidate = [
  body("title").exists().withMessage("Title is required").isString(),
  body("completed").exists(),
  body("date").exists(),
];
