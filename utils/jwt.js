const jwt = require('jsonwebtoken');

const privateKey = 'supersecureKey';

exports.generateToken = (info) => {
    return jwt.sign(info, privateKey);
};

exports.validateToken = (token) => {
    try {
        return jwt.verify(token, privateKey, {
            expiresIn: "1h"
        });
    } catch(error) {
        return false;
    }
};