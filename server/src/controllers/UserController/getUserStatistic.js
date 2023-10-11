import { UserService } from "../../services/index.js";

const getUserStatistic = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await UserService.getUserStatistic(id);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export {getUserStatistic}