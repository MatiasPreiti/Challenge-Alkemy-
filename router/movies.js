const moviesController = require("../controllers/movies");
const { validateAccessToken } = require("../middlewares/valideteToken");

module.exports = (app) => {
  app.get("/", validateAccessToken, moviesController.getMovies);
  app.get("/:id", validateAccessToken, moviesController.getMovieById);
  app.post("/", validateAccessToken, moviesController.addMovie);
  app.post("/:id", validateAccessToken, moviesController.editMovie);
  app.delete("/:id", validateAccessToken, moviesController.deleteMovie);
};
