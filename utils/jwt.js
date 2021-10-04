const jwt = require('jsonwebtoken');

const privateKey = 'supersecureKey';

function generateToken(info) {
    return jwt.sign(info, privateKey);
};

function validateToken(token) {
    try {
        return jwt.verify(token, privateKey, {
            expiresIn: "1h"
        });
    } catch (error) {
        return false;
    }
};

module.exports = { generateToken, validateToken }