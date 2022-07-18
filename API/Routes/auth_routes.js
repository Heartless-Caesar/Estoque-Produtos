const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  userLogin,
} = require("../Operações_de_usuario/auth_controller");

authRouter.route("/usuario/cadastro").post(registerUser);

authRouter.route("/usuario/login").post(userLogin);

module.exports = { authRouter };
