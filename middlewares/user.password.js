const bcrypt = require("bcryptjs");
function passVerify(queryUser, password) {
    const user = queryUser[0];
    //corroboración de password y creacion de token
    if (user) {
        const pwCorrect = bcrypt.compare(password, user.password);
        if (pwCorrect) {
            const token = generateToken({
                user_id: user.user_id,
                username: user.username,
            });
            res.status(200).json({
                success: true,
                user_id: user.user_id,
                accessToken: token,
                username: user.username,
            });
        } else {
            res.status(401).json({
                success: false,
                error: "tu usuario y/o contraseña no son existentes",
            });
        }
    } else {
        res.status(401).json({
            success: false,
            error: "tu usuario y/o contraseña no son existentes",
        });
    }
}

module.exports = { passVerify };
