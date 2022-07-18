const express = require("express");
const inventoryRouter = express.Router();
const {
  createEstoque,
  updateEstoque,
  deleteEstoque,
  getEstoque,
} = require("../Operações_de_Estoque/operacoes_de_estoque");

inventoryRouter.route("/estoque/criar").post(createEstoque);
inventoryRouter.route("/estoque/listar").get(getEstoque);
inventoryRouter.route("/estoque/atualizar").patch(updateEstoque);
inventoryRouter.route("/estoque/deletar").delete(deleteEstoque);

module.exports = { inventoryRouter };
