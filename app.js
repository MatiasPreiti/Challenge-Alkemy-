const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const slash = require('express-slash');
const { errorHandler, wrapErrors, logErrors} = require('./middlewares/errorHandlers');
const { notFoundHandler } = require ('./middlewares/notFoundHandler')

const moviesRoutes = require('./router/movies');
const characterRoutes = require('./router/character');
const genreRoutes = require('./router/genre');
const userRoutes = require('./router/users');

// Set up express app
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//router.
const router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
});
router.use("/movies", moviesRoutes, () => console.log());
router.use("/characters", characterRoutes);
router.use("/genre", genreRoutes);
router.use("/user", userRoutes);

app.use(slash());

// Catch 404 Caputurar error 404
app.use(notFoundHandler);

// Error midldlewares (manejadores de errores)
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//port
const port = parseInt(process.env.PORT) || 8000;
app.set("port", port);
app.listen(port, () => console.log("app escuchando en puerto " + port));

module.exports = app;
