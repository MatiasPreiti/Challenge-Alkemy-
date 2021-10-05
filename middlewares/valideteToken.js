const { validateToken } = require("../utils/jwt");

function validateAccessToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({
      success: false,
      error: "A token must be provided",
    });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const validToken = validateToken(token);

  if (validToken) {
    req.token_info = validToken;
    next();
  } else {
    res.status(401).json({
      success: false,
      error: "Unauthorized - Invalid Token",
    });
  }
}

module.exports = { validateAccessToken };
