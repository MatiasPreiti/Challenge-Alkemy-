const { QueryTypes } = require('sequelize');
const db = require('../models/index');


// GET   
async function getCharacters (req, res) {
    await db.query('SELECT image, name FROM characters', {
        type: QueryTypes.SELECT
    })
        .then(characters => res.json(characters))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};

async function getCharacterByName (req, res) {
  const { name } = req.params;
 

  db.query('SELECT * FROM characters WHERE name = ?', {
      type: QueryTypes.SELECT,
      replacements: [name]
  })
      .then(characters => res.json(characters[0]))
      .catch(error => res.status(500).json({
          error: "Server Internal Error",
          success: false
      }));
};

// CREATE CHARACTER
async function createCharacter(req, res) {
  const character = req.body;
  const { image, name, age, weight, history } = req.body;

  db.query('INSERT INTO characters (image, name, age, weight, history) VALUES (?, ?, ?, ? ,?)', {
      type: QueryTypes.INSERT,
      replacements: [image, name, age, weight, history]
  })
      .then(() => {
          res.status(201).json({
              success: true,

              msg: "The character was created successfully",
              character: character
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

async function updateCharacter (req, res) {
  const character = req.body;
  const { id } = req.params;
  const {
      image,
      name,
      age,
      weight,
      history
  } = req.body;

  db.query('UPDATE characters SET image = ?, name = ?, age = ?, weight = ?, history = ? WHERE id = ?', {
      type: QueryTypes.UPDATE,
      replacements: [image, name, age, weight, history, id]
  })
      .then(() => {
          res.status(200).json({
              success: true,
              msg: "The character was updated successfully",
              character: character
          });
      })
      .catch(err => {
          res.status(500).json({
              success: false,
              error: 'Server internal error'
          });
      });
}

//DELETE

async function deleteCharacterById (req, res) {
  const {
      id
  } = req.params;

  db.query('DELETE FROM characters WHERE id = ?', {
      type: QueryTypes.DELETE,
      replacements: [id]
  })
      .then(characters => res.json({
          success: true,
          msg: "The character was deleted successfully"
      }))
      .catch(error => res.status(500).json({
          error: "Server Internal Error",
          success: false
      }));
};


module.exports = { getCharacterByName, getCharacters, createCharacter, updateCharacter, deleteCharacterById };