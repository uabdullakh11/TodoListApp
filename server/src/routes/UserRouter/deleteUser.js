import express from "express";
import { UserController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";

const deleteUser = express.Router();

deleteUser.delete("/", authCheck, UserController.deleteUser);

// export { deleteUser };

export default deleteUser;