import bcrypt from "bcrypt";
import { config } from "../config/index.js";
import jwt from "jsonwebtoken";
import pkg from "http-errors";
const { Forbidden, BadRequest } = pkg;

const { TokenExpiredError } = jwt;

// const catchError = (err, res) => {
//   if (err instanceof TokenExpiredError) {
//     return res.status(401).send("Unauthorized! Access Token was expired!");
//     // return "Unauthorized! Access Token was expired!";
//   }
//   return res.sendStatus(401).send("Unauthorized!");
//   // return "Unauthorized!";
// };

export function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword);
}
export function verifyToken(token, secretKey) {
  try {
    // return jwt.verify(token, secretKey, (err, decoded) => {
    //   if (err) {
    //     return catchError(err, res);
    //   }
    //   console.log("auth ", decoded.id);
    //   return decoded.id;
    //   // req.userId = decoded.id;
    //   // next();
    // });
    return jwt.verify(token, secretKey);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new BadRequest("Unauthorized! Access Token was expired!");
    }
    throw new BadRequest("Unauthorized!");
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
      expiresIn: "1m",
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
