const db = require("../models/index");
const { QueryTypes } = require("sequelize");

// GET MOVIES (LIST WITH TITLE AND GENRE)
async function getMovies(req, res) {
  try {
    const { title, genreMovie } = req.query;

    if (!title && !genreMovie) {
      const queryResponse = await db.query("SELECT image, title FROM movies", {
        type: QueryTypes.SELECT,
      });
      res.json(queryResponse);
    }

    if (genreMovie && title) {
      let queryResponse = await db.query(
        "SELECT image, title FROM movies WHERE genreMovie = ? AND title = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [genreMovie, title],
        }
      );
      res.json({ queryResponse });
    }

    // FILTER BY TITLE
    if (title && !genreMovie) {
      const movieTittle = "%" + title + "%";
      let queryResponse = await db.query(
        "SELECT image, title FROM movies WHERE title LIKE ?",
        {
          type: QueryTypes.SELECT,
          replacements: [movieTittle],
        }
      );
      res.json({ queryResponse });
    }

    // FILTER BY GENRE
    if (genreMovie && !title) {
      let queryResponse = await db.query(
        "SELECT image, title FROM movies WHERE genreMovie = ?",
        {
          type: QueryTypes.SELECT,
          replacements: [genreMovie],
        }
      );
      res.json({ queryResponse });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// CREATE MOVIE
async function addMovie(req, res) {
  try {
    const movie = req.body;
    const {
      image,
      title,
      calification,
      dateCreation,
      charactersAsociated,
      genreMovie,
    } = req.body;

    await db.query(
      "INSERT INTO movies (image, title, calification, dateCreation, characterAsociated, genremovie) VALUES (?, ?, ? ,? ,?,?)",
      {
        type: QueryTypes.INSERT,
        replacements: [
          image,
          title,
          calification,
          dateCreation,
          charactersAsociated,
          genreMovie,
        ],
      }
    );
    res.status(201).json({
      success: true,
      msg: `the movie ${title} was created successfully`,
      movie: movie,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// GET MOVIE BY ID
async function getMovieById(req, res) {
  try {
    const { id } = req.params;

    const movies = await db.query(
      "SELECT image, title FROM movies WHERE id = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    res.json(movies[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// EDIT MOVIE
async function editMovie(req, res) {
  try {
    const movie = req.body;
    const { id } = req.params;
    const {
      image,
      title,
      calification,
      dateCreation,
      charactersAsociated,
      genreMovie,
    } = req.body;

    const queryResponse = db.query(
      "UPDATE movies SET image = ?, title = ?, calification = ?, dateCreation = ?, characterAsociated = ?, genremovie = ?)",
      {
        type: QueryTypes.UPDATE,
        replacements: [
          image,
          title,
          calification,
          dateCreation,
          charactersAsociated,
          genreMovie,
        ],
      }
    );
    res.status(200).json({
      success: true,
      msg: `movie ${queryResponse.title} is updated succesfully`,
      movie: queryResponse,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

// DELETE MOVIE
async function deleteMovie(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM movies WHERE id = ?", {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.json({
      success: true,
      msg: "The movie was deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Server internal error",
    });
  }
}

module.exports = { getMovies, getMovieById, addMovie, deleteMovie, editMovie };
