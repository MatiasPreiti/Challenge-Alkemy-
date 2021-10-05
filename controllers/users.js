require("dotenv").config();
const bcrypt = require("bcryptjs");
const { QueryTypes } = require("sequelize");

const sendMail = require("../middlewares/sendMail");

const { generateToken } = require("../util/jwt");
const db = require("../models/index");
const { passVerify } = require("../middlewares/user.password");
const tokenRounds = 10;

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const queryUser = db.query("SELECT * FROM users WHERE username = ?", {
      type: QueryTypes.SELECT,
      replacements: [username],
    });
    passVerify(password, queryUser);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hash(password, tokenRounds);

    await db.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      {
        type: QueryTypes.INSERT,
        replacements: [username, hashedPassword, email],
      }
    );
    res.status(201).json({
      success: true,
      msg: `User ${username} created successfully`,
    });
    try {
      await sendMail(username, email);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    db.query("SELECT * FROM users", {
      type: QueryTypes.SELECT,
    });
    res.json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { username } = req.params;

    db.query("DELETE FROM users WHERE username = ?", {
      type: QueryTypes.DELETE,
      replacements: [username],
    });
    res.json({
      success: true,
      msg: `User ${username} deleted successfully`,
      deletedUser: user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

module.exports = { deleteUser, getAllUsers, register, login };
