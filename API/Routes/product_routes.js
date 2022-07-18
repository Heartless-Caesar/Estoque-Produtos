const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../Operações_de_Produto/operacoes_de_produto");

productRouter.route("/produto/criar").post(createProduct);
productRouter.route("/produto/atualizar").patch(updateProduct);
productRouter.route("/produto/deletar").delete(deleteProduct);

module.exports = { productRouter };
