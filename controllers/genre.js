const { QueryTypes } = require("sequelize");
const { db } = require("../models/index");

// GET
async function getGenre(req, res) {
  try {
    await db
      .query("SELECT * FROM genre", {
        type: QueryTypes.SELECT,
      })
      .then((genre) => res.json(genre));
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// CREATE
async function createGenre(req, res) {
  try {
    const { name, image, asociatedmovies } = req.body;
    await db.query(
      "INSERT INTO genre ( name, image, asociatedmovies ) VALUES (? ,? ,?)",
      {
        type: QueryTypes.INSERT,
        replacements: [name, image, asociatedmovies],
      }
    );

    res.status(201).json({
      success: true,
      msg: `the genre ${name} was created successfully`,
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
async function updateGenre(req, res) {
  try {
    const { id } = req.params;
    const { name, image, asociatedmovies } = req.body;

    await db.query(
      "UPDATE genre SET name = ?, image = ?, asociatedmovies = ? WHERE genre_id = ?",
      {
        type: QueryTypes.UPDATE,
        replacements: [name, image, asociatedmovies, id],
      }
    );
    res.status(200).json({
      success: true,
      msg: `the genre ${name} was update successfully`,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// DELETE GENRE
async function deleteGenre(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM genre WHERE genre_id = ?", {
      type: QueryTypes.DELETE,
      replacements: [id],
    });

    res.json({
      success: true,
      msg: "The genre was deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

module.exports = { deleteGenre, createGenre, getGenre, updateGenre };
