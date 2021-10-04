require("dotenv").config();
const bcrypt = require("bcryptjs");
const { QueryTypes } = require("sequelize");

const sendMail = require('../middlewares/sendMail');

const { generateToken } = require("../util/jwt");
const db = require('../models/index');

const tokenRounds = 10;

function login(req, res) {
  const { username, password } = req.body;
  const queryUser = db.query("SELECT * FROM users WHERE username = ?", {
    type: QueryTypes.SELECT,
    replacements: [username],
  })
    .then((queryUser) => {
      const user = queryUser[0];
      //corroboración de password y creacion de token
      if (user) {
        const pwCorrect = bcrypt.compare(password, user.password);
        if (pwCorrect) {
          const token = generateToken({
            user_id: user.user_id,
            username: user.username,
          });
          res.status(200).json({
            success: true,
            user_id: user.user_id,
            accessToken: token,
            username: user.username,
          });
        } else {
          res.status(401).json({
            success: false,
            error: "tu usuario y/o contraseña no son existentes",
          });
        }
      } else {
        res.status(401).json({
          success: false,
          error: "tu usuario y/o contraseña no son existentes",
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error: "Server Internal Error",
        errorData: error,
        success: false,
      })
    );
};

function register(req, res) {
  const { username, password, email } = req.body;

  const hashedPassword = bcrypt.hash(password, tokenRounds);

  db.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    {
      type: QueryTypes.INSERT,
      replacements: [username, hashedPassword, email],
    }
  )
    .then((res) => {
      res.status(201).json({
        success: true,
        msg: `User ${username} created successfully`,
      });
      try {await sendMail(username, email);
      }catch(err) {console.error(err)};
    })
    .catch((error) =>
      res.status(500).json({
        error: "Server Internal Error",
        errorData: error,
        success: false,
      })
    );
};

function getAllUsers(req, res) {
  db.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
  })
    .then((users) => res.json(users))
    .catch((error) =>
      res.status(500).json({
        error: "Server Internal Error",
        success: false,
      })
    );
};

function deleteUser(req, res) {
  const { username } = req.params;

  db.query("DELETE FROM users WHERE username = ?", {
    type: QueryTypes.DELETE,
    replacements: [username],
  })
    .then(() =>
      res.json({
        success: true,
        msg: `User ${username} deleted successfully`,
        deletedUser: user,
      })
    )
    .catch((error) =>
      res.status(500).json({
        error: "Server Internal Error",
        success: false,
      })
    );
};

module.exports = { deleteUser, getAllUsers, register, login };