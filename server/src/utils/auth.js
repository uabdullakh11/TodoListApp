import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import jwt from "jsonwebtoken";
import pkg from "http-errors";
const { Unauthorized, BadRequest } = pkg;

const { TokenExpiredError } = jwt;

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
    if (err instanceof TokenExpiredError) {
      throw new Unauthorized("Unauthorized! Access Token was expired!");
    }
    throw new BadRequest("invalid token!");
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
      expiresIn: "30m",
    }
  );
}
export function generateRefreshToken(id) {
  return jwt.sign(
    {
      id,
      type: "REFRESH_TOKEN",
    },
    config.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
}
