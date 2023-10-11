import { UserService } from "../../services/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const changeUserInfo = async (req, res, next) => {
  if (!req.body) throw new BadRequest("No data sent!");
  const id = req.userId;
  try {
    const result = await UserService.changeUserInfo(
      id,
      req.body.newLogin,
      req.body.newEmail,
      req.query.change
    );
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export {changeUserInfo}