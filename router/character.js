const characterController = require('../controllers/character');
const { validateAccessToken } = require('../middlewares/valideteToken');

module.exports = (app) => {
app.get('/all', validateAccessToken, characterController.getCharacters);
app.get('/:name', validateAccessToken, characterController.getCharacterByName);
app.post('/', validateAccessToken, characterController.createCharacter);
app.delete('/:id', validateAccessToken, characterController.updateCharacter);
app.delete('/:id', validateAccessToken, characterController.deleteCharacterById);
}