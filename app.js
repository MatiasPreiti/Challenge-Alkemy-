const express = require("express");
const morgan = require("morgan");
const moviesRoutes = require("./router/movies");
const genreRoutes = require("./router/genre");
const characterRoutes = require("./router/character");

// This will be our application entry. We'll setup our server here.
const http = require("http");

// Set up the express app
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//router.
const router = express.Router();
router.use("/movies", moviesRoutes);
router.use("/characters", characterRoutes);
router.use("/genre", genreRoutes);

//set port
const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log("app escuchando en puerto " + port));

module.exports = app;
