const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const moviesRoutes = require("./router/movies");
const genreRoutes = require("./router/genre");
const characterRoutes = require("./router/character");

// Set up express app
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//router.
const router = express.Router();
router.use("/movies", moviesRoutes);
router.use("/characters", characterRoutes);
router.use("/genre", genreRoutes);

//port
const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
server.listen(port, () => console.log("app escuchando en puerto " + port));

module.exports = app;
