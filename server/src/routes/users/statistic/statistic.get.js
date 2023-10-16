import express from "express";
import { UserController } from "../../../controllers/index.js";
import { authCheck } from "../../../middleware/authCheck.js";

const getUserStatistic = express.Router();

getUserStatistic.get("/", authCheck, UserController.getUserStatistic);

// export {getUserStatistic}

export default getUserStatistic;
