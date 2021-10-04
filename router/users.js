const userController = require("../controllers/users");

module.exports = (app) => {
  app.get("/", userController.getAllUsers);
  app.delete("/auth/:username", validateAccessToken, userController.deleteUser);
  app.post("/auth/register", userController.register);
  app.post("/auth//login", userController.login);
};
