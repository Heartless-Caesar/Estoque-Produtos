const { StatusCodes } = require("http-status-codes");
const { produto, estoque, venda } = require("../Data/models");

const newSale = async (req, res) => {
  const { nomeProduto, quantidade, nomeEstoque } = req.body;

  try {
    //Encontra o estoque selecionado
    const estoqueSelecionado = await estoque.findOne({
      where: { nome: nomeEstoque },
    });

    //Encontra o produto selecionado que pertence ao estoque selecionado
    const produtoEscolhido = await produto.findOne({
      where: { estoqueId: estoqueSelecionado.id, nome: nomeProduto },
    });

    //Retorna 404 caso o produto não exista no estoque
    if (!produtoEscolhido) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "O produto escolhido não existe no estoque selecionado" });
    }

    //Caso não haja mais produtos disponíveis
    if (produtoEscolhido.quantidade <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Não há mais unidades deste produto disponíveis" });
    }
    //Diminuindo do total de produtos
    produtoEscolhido.quantidade -= quantidade;
    await produtoEscolhido.save();

    //Criação da nova entrada de venda
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
