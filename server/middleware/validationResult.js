import { validationResult } from "express-validator";
import pkg from "http-errors"
const {BadRequest} = pkg;

export function validateRequestResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequest({ errors: errors.array()[0].msg })
    // return res.status(400).json({ errors: errors.array() });
  }
  next();
}
