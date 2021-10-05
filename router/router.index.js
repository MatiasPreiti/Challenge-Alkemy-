const express = require('express');
const slash = require('express-slash');

const moviesRoutes = require('./movies');
const characterRoutes = require('./character');
const genreRoutes = require('./genre');
const userRoutes = require('./users');

function disneyApi (app) {
    // Creacion del router
    const router = express.Router({
        caseSensitive: app.get('case sensitive routing'),
        strict: app.get('strict routing')
    });

    //rutas
    router.use("/movies", moviesRoutes, () => console.log("funciona"));
    router.use("/characters", characterRoutes);
    router.use("/genre", genreRoutes);
    router.use("/user", userRoutes);

    // evitar errores por /
    app.use(slash());
}
   

module.exports = { disneyApi };
