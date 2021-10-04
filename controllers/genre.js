const { QueryTypes } = require('sequelize');
const db = require('../models/index');


// GET
async function getGenre (req, res) {
    await db.query('SELECT * FROM genre', {
            type: QueryTypes.SELECT
        })
        .then(genre => res.json(genre))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};


// CREATE
async function createGenre (req, res) {
    const genre = req.body;
    const { name, image, movies } = req.body;

    await db.query('INSERT INTO genre ( name, image, asociatedmovies ) VALUES (? ,? ,?)', {
        type: QueryTypes.INSERT,
        replacements: [name, image, asociatedmovies]
    })
        .then(() => {
            res.status(201).json({
                success: true,
                msg: `the genre ${name} was created successfully`,
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};


// UPDATE
 async function updateGenre (req, res) {
    const genre = req.body;
    const { id } = req.params;
    const {
        name,
        image,
        asociatedmovies
    } = req.body;

    db.query('UPDATE genre SET name = ?, image = ?, asociatedmovies = ? WHERE genre_id = ?', {
        type: QueryTypes.UPDATE,
        replacements: [ name, image, asociatedmovies, genreId]
    })
        .then(() => {
            res.status(200).json({
                success: true,
                msg: `the genre ${name} was update successfully`,
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
}


// DELETE GENRE
async function deleteGenre (req, res) {
    const {
        id
    } = req.params;

    await db.query('DELETE FROM genre WHERE genre_id = ?', {
        type: QueryTypes.DELETE,
        replacements: [id]
    })
        .then(genre => res.json({
            success: true,
            msg: "The genre was deleted successfully"
        }))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};


module.exports = { deleteGenre, createGenre, getGenre, updateGenre };