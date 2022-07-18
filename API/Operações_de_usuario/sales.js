const { StatusCodes } = require("http-status-codes");
const { produto, estoque, venda } = require("../Data/models");

const newSale = async (req, res) => {
  const { nomeProduto, quantidade, nomeEstoque } = req.body;

  try {
    const estoqueSelecionado = await estoque.findOne({
      where: { nome: nomeEstoque },
    });

    const produtoEscolhido = await produto.findOne({
      where: { estoqueId: estoqueSelecionado.id, nome: nomeProduto },
    });

    if (!produtoEscolhido) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "O produto escolhido não existe no estoque selecionado" });
    }

    if (produtoEscolhido.quantidade <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Não há mais unidades deste produto disponíveis" });
    }
    produtoEscolhido.quantidade -= quantidade;
    await produtoEscolhido.save();

    const novaVenda = await venda.create({
      item: nomeProduto,
      quantidade: quantidade,
    });

    res
      .status(StatusCodes.OK)
      .json({ msg: "Venda realizada", venda: novaVenda });
  } catch (error) {}
};

module.exports = { newSale };
