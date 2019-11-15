const bcrypt = require('bcryptjs');

const db = require('./model');
const generateToken = require('../../utils/generateToken');

exports.signup = async (req, res) => {
  let { username, password, department } = req.body;

  try {
    let exists = await db.getUser(username);
    if (exists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 14);
    let newUser = {
      username,
      password: hashedPassword,
      department
    };

    let user = await db.postUser(newUser);
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body;

  try {
    let user = await db.getUser(username);
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Invalid Credentials' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    console.log(req.department);
    let users = await db.getAllUsers(req.department);
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
