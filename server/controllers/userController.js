import Todo from "../models/Todo.js";
import User from "../models/User.js";

const createUser = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const [login, email, password] = [
    req.body.login,
    req.body.email,
    req.body.password,
  ];
  try {
    const newUser = await User.create({
      login,
      email,
      password,
    });
    res.send(newUser);
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

const getUser = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    console.log((await User.findAll({ include: Todo })).toJSON())
    res.send(user);
  } catch (err) {
    console.log(err);
  }
}

export { createUser, deleteUser, getUser};
