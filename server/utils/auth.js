import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import jwt from "jsonwebtoken";

export function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword);
}
export function verifyToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.log(err);
  }
}
export function generateAccessToken(id) {
  return jwt.sign(
    {
      id,
      type: "ACCESS",
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
}
