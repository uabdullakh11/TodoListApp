import User from "../models/User.js";
import Token from "../models/Token.js";
import { Op } from "sequelize";
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/auth.js";
import { UserService } from "./index.js";
import { config } from "../config/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const login = async (login, password) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: login,
          },
          {
            login: login,
          },
        ],
      },
    });
    // if (!user) throw new BadRequest("User not found!");

    if (!(await comparePasswords(password, user.password)))
      throw new BadRequest("Invalid login or password!");

    const REFRESH_TOKEN = generateRefreshToken(user.id);

    const userToken = await Token.findOne({ where: { userId: user.id } });
    if (userToken) await userToken.destroy();
    await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();

    return {
      ACCESS_TOKEN: generateAccessToken(user.id),
      expires_in: Math.floor(new Date().getTime() / 1000),
      REFRESH_TOKEN,
    };
  } catch (error) {
    throw new BadRequest(error);
  }
};

const register = async (login, email, password) => {
  try {
    // let user = await User.findOne({
    //   where: {
    //     [Op.or]: [
    //       {
    //         email: email,
    //       },
    //       {
    //         login: login,
    //       },
    //     ],
    //   },
    // });

    // if (user) throw new BadRequest("User already exist!");
    // user = await UserService.createUser(login, email, password);
    const user = await UserService.createUser(login, email, password);

    const REFRESH_TOKEN = generateRefreshToken(user.id);
    await Token.create({ userId: user.id, token: REFRESH_TOKEN });

    return {
      ACCESS_TOKEN: generateAccessToken(user.id),
      expires_in: Math.floor(new Date().getTime() / 1000),
      REFRESH_TOKEN,
    };
  } catch (error) {
    throw new BadRequest(error);
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const token = await Token.findOne({
      where: { token: refreshToken },
    });
    if (!token) throw new BadRequest("Invalid refresh token");
    const user = verifyToken(refreshToken, config.JWT_REFRESH_SECRET_KEY);
    if (!user) throw new BadRequest("Invalid refresh token");

    console.log(token.verifyExpiration(token));
    // if (
    //   token.expiryDate.getTime() <=
    //   Math.floor(new Date().getTime() / 1000) - 86400
    // ) {
    if (token.verifyExpiration(token)) {
      //если истек срок refresh обновить в базе
      const REFRESH_TOKEN = generateRefreshToken(user.id);
      await token.destroy();
      await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();
    }

    const ACCESS_TOKEN = generateAccessToken(user.id);
    //создать refsresh_token и заменить в базе
    const REFRESH_TOKEN = generateRefreshToken(user.id);
    await token.destroy();
    await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();

    return {
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      expires_in: Math.floor(new Date().getTime() / 1000),
    };
  } catch (error) {
    throw new BadRequest(error);
  }
};

export { login, register, refreshToken };
