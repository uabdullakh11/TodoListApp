import pkg from "express-validator";
const { body, query, params } = pkg;
import User from "../models/User.js";
import { Op } from "sequelize";

export const registValidate = [
  body("login")
    .exists()
    .withMessage("Login is required")
    .isString()
    .withMessage("Login should be string")
    .isLength({ min: 3 })
    .withMessage("Login should be at least 3 characters")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { login: value } });
      if (existingUser) {
        throw new Error("A user already exists!");
      }
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
  body("email")
    .exists()
    .isEmail()
    .withMessage("Provide valid email")
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("A user already exists!");
      }
    }),
];

export const loginValidate = [
  body("login")
    .exists()
    .withMessage("Login or email is required")
    .isString()
    .withMessage("Login or emai should be string")
    .isLength({ min: 3 })
    .withMessage("Login must be at least 3 characters")
    .custom(async (value) => {
      if (/@/i.test(value) && !/\S+@\S+\.\S+/.test(value)) {
        throw new Error("Invalid email address");
      }
      const isUserExist = await User.findOne({
        where: {
          [Op.or]: [
            {
              email: value,
            },
            {
              login: value,
            },
          ],
        },
      });
      if (!isUserExist) {
        throw new Error("User not found!");
      }
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
];

export const tokenValidate = [
  body("refreshToken").exists().withMessage("Refresh Token is required"),
];
export const AddTaskValidate = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .notEmpty()
    .withMessage("Title should not be empty"),
  body("completed").exists().withMessage("Completed is required"),
  body("date")
    .exists()
    .withMessage("Date is required")
    .isString()
    .notEmpty()
    .withMessage("Date should not be empty"),
];

export const UpdateTaskValidate = [
  body("id").exists().withMessage("ID is required").isString(),
  body("title")
    .exists()
    .withMessage("Title is required")
    .isString()
    .notEmpty()
    .withMessage("Title should not be empty"),
  body("completed").exists().withMessage("Completed is required"),
  body("date")
    .exists()
    .withMessage("Date is required")
    .isString()
    .notEmpty()
    .withMessage("Date should not be empty"),
];

export const passwordValidate = [
  body("newPassword")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
  body("currentPassword")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
];

export const changeUserInfoValidate = [
  body("newLogin")
    .isLength({ min: 3 })
    .withMessage("Login must be at least 3 characters"),
  // .custom(async (value) => {
  //   const existingUser = await User.findOne({
  //     where: { login: value },
  //   });
  //   if (existingUser) {
  //     throw new Error("This login already exists!");
  //   }
  // }),
  body("newEmail").isEmail().withMessage("Provide valid email"),
  // .custom(async (value) => {
  //   const existingUser = await User.findOne({ where: { email: value } });
  //   if (existingUser) {
  //     throw new Error("This email already exists!");
  //   }
  // }),
];
