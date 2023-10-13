import { UserService } from "../../services/index.js";

const changeUserPassword = async (req, res, next) => {
  const id = req.userId;
  const [currentPassword, newPassword] = [
    req.body.currentPassword,
    req.body.newPassword,
  ];
  try {
    const result = await UserService.changeUserPassword(
      id,
      currentPassword,
      newPassword
    );
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export {changeUserPassword};
