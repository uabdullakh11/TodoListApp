import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { hashPassword, verifyToken } from "../utils/auth.js";

// const createUser = async (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const [login, email, password] = [
//     req.body.login,
//     req.body.email,
//     req.body.password,
//   ];
//   const hashedPassword = hashPassword(password);
//   try {
//     const newUser = await User.create({
//       login,
//       email,
//       password: hashedPassword,
//     });
//     res.send(newUser);
//   } catch (err) {
//     console.log(err);
//   }
// };

const createUser = async (login, email, password) => {
  const hashedPassword = hashPassword(password);
  try {
    const newUser = await User.create({
      login,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const [id] = [req.body.id];
  try {
    await User.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    res.send(`Deleted user with id: ${id}`);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {

}

const getUserById = async (req, res) => {
  // if (!req.params.id) return res.sendStatus(400);
  const authHeader = req.headers.authorization;
  const token = authHeader.slice(7,);
  // if (!token) return res.sendStatus(400);
  // req.user = verifyToken(token, config.JWT_SECRET_KEY);
  const authUser = verifyToken(token, 'secret');
  const id = authUser.id;
  try {
    const user = await User.findByPk(id);
    // console.log((await User.findAll({ include: Todo })).toJSON())
    res.send(user);
  } catch (err) {
    console.log(err);
  }
}

export { createUser, deleteUser, getUserById};
