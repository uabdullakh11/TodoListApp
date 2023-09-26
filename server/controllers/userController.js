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

export { createUser };
