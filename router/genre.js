const genreController = require("../controllers/genre");

module.exports = (app) => {
  app.get("/", validateAccessToken, genreController.getGenre);
  app.delete("/:id", validateAccessToken, genreController.deleteGenre);
  app.post("/", validateAccessToken, genreController.createGenre);
};
