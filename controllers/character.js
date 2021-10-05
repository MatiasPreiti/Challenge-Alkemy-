const { QueryTypes } = require("sequelize");
const db = require("../models/index");

// GET
async function getCharacters(req, res) {
  try {
    const query = await db
      .query("SELECT image, name FROM characters", {
        type: QueryTypes.SELECT,
      })
      .then((characters) => res.json(characters));
  } catch (error) {
    res.status(500).json;
    console.error("Server Internal Error");
  }
}

async function getCharacterByName(req, res) {
  try {
    const { name } = req.params;

    const character = db.query("SELECT * FROM characters WHERE name = ?", {
      type: QueryTypes.SELECT,
      replacements: [name],
    });
    res.json(characters[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// CREATE CHARACTER
async function createCharacter(req, res) {
  try {
    const character = req.body;
    const { image, name, age, weight, history } = req.body;

    const character = await db.query(
      "INSERT INTO characters (image, name, age, weight, history) VALUES (?, ?, ?, ? ,?)",
      {
        type: QueryTypes.INSERT,
        replacements: [image, name, age, weight, history],
      }
    );
    res.status(201).json({
      success: true,
      msg: "The character was created successfully",
      character: character,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// UPDATE

async function updateCharacter(req, res) {
  try {
    const character = req.body;
    const { id } = req.params;
    const { image, name, age, weight, history } = req.body;

    const chharacter = await db.query(
      "UPDATE characters SET image = ?, name = ?, age = ?, weight = ?, history = ? WHERE id = ?",
      {
        type: QueryTypes.UPDATE,
        replacements: [image, name, age, weight, history, id],
      }
    );
    res.status(200).json({
      success: true,
      msg: "The character was updated successfully",
      character: character,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

//DELETE

async function deleteCharacterById(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM characters WHERE id = ?", {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.json({
      success: true,
      msg: "The character was deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

module.exports = {
  getCharacterByName,
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacterById,
};
