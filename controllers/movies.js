const db = require('../models/index');
const {
  QueryTypes
} = require('sequelize');


// GET MOVIES (LIST WITH TITLE AND GENRE)
async function getMovies(req, res) {

  const { title, genreMovie } = req.query;

  if (!title && !genreMovie) {
    await db.query('SELECT image, title FROM movies', {
      type: QueryTypes.SELECT
    })
      .then(movies => res.json(movies))
      .catch(error => res.status(500).json({
        error: "ocurrio un error inesperado en su consulta",
        success: false
      }));
  }

  if (genreMovie && title) {
    let response = await db.query('SELECT image, title FROM movies WHERE genreMovie = ? AND title = ?', {
      type: QueryTypes.SELECT,
      replacements: [genreMovie, title]
    })
    res.json({ response })
  }

  // FILTER BY TITLE
  if (title && !genreMovie) {
    const movieTittle = '%' + title + '%'
    let response = await db.query('SELECT image, title FROM movies WHERE title LIKE ?', {
      type: QueryTypes.SELECT,
      replacements: [movieTittle]
    })
    res.json({ response })
  }


  // FILTER BY GENRE
  if (genreMovie && !title) {
    let response = await db.query('SELECT image, title FROM movies WHERE genreMovie = ?', {
      type: QueryTypes.SELECT,
      replacements: [genreMovie]
    })
    res.json({ response })
  }
};

// CREATE MOVIE
async function addMovie(req, res) {
  const movie = req.body;
  const { image, title, calification, dateCreation, charactersAsociated, genreMovie } = req.body;

  await db.query('INSERT INTO movies (image, title, calification, dateCreation, characterAsociated, genremovie) VALUES (?, ?, ? ,? ,?,?)', {
    type: QueryTypes.INSERT,
    replacements: [image, title, calification, dateCreation, charactersAsociated, genreMovie]
  })
    .then(() => {
      res.status(201).json({
        success: true,
        msg: `the movie ${title} was created successfully`,
        movie: movie
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: 'Server internal error'
      });
    });
};


// GET MOVIE BY ID
async function getMovieById(req, res) {
  const { id } = req.params;

  await db.query('SELECT image, title FROM movies WHERE id = ?', {
    type: QueryTypes.SELECT,
    replacements: [id]
  })
    .then(movies => res.json(movies[0]))
    .catch(error => res.status(500).json({
      error: "Server Internal Error",
      success: false
    }));
};


// EDIT MOVIE
async function editMovie(req, res) {
  const movie = req.body;
  const { id } = req.params;
  const {
    image, title, calification, dateCreation, charactersAsociated, genreMovie
  } = req.body;

  db.query('UPDATE movies SET image = ?, title = ?, calification = ?, dateCreation = ?, characterAsociated = ?, genremovie = ?)', {
    type: QueryTypes.UPDATE,
    replacements: [image, title, calification, dateCreation, charactersAsociated, genreMovie]
  })
    .then(() => {
      res.status(200).json({
        success: true,
        msg: `movie ${title} is updated succesfully`,
        movie: movie
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: 'Server internal error'
      });
    });
}


// DELETE MOVIE 
async function deleteMovie(req, res) {
  const {
    id
  } = req.params;

  const selectedMovie = await db.query('DELETE FROM movies WHERE id = ?', {
    type: QueryTypes.DELETE,
    replacements: [id]
  })
    .then(selectedMovie => res.json({
      success: true,
      msg: "The movie was deleted successfully"
    }))
    .catch(error => res.status(500).json({
      error: "Server Internal Error",
      success: false
    }));
};


module.exports = { getMovies, getMovieById, addMovie, deleteMovie, editMovie }





