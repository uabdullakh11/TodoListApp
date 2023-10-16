import User from "../../models/User.js";
import Token from "../../models/Token.js";
import { Op } from "sequelize";
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/auth.js";
import pkg from "http-errors";
// import { AppError } from "../../utils/appError.js";
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

    if (!(await comparePasswords(password, user.password)))
      throw new BadRequest("Invalid login or password!");

    const REFRESH_TOKEN = generateRefreshToken(user.id);

    // const userToken = await Token.findOne({ where: { userId: user.id } });
    // if (userToken) await userToken.destroy();
    // await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();

    const userToken = await Token.findOne({ where: { userId: user.id } });
    
    await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();

    return {
      ACCESS_TOKEN: generateAccessToken(user.id),
      expires_in: Math.floor(new Date().getTime() / 1000),
      REFRESH_TOKEN,
    };
  } catch (error) {
    // throw new AppError(error);
    throw new BadRequest(error);
  }
};

export { login };
