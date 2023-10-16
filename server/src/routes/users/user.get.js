import express from "express";
import { UserController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";

const getUserById = express.Router();

getUserById.get("/", authCheck, UserController.getUserById);

// export { getUserById };
export default getUserById;
