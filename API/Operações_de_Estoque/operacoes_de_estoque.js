const { StatusCodes } = require("http-status-codes");
const { estoque, produto } = require("../Data/models");

//GET ENTRIES
const getEstoque = async (req, res) => {
  try {
    const productList = await produto.findAll();

    res
      .status(StatusCodes.OK)
      .json({ msg: "GET successful", products: productList });
  } catch (error) {
    //Vetor auxiliar
    const errorMessages = [];
    console.log(error);
    //Filtra o erro de forma a colocar apenas a mensagem de erro principal
    //error.errors.forEach((x) => errorMessages.push(x.message));

    //Resposta com as mensagens individuais dos problemas ocorridos
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Algo deu errado ao tentar buscar o novo estoque",
      errors: errorMessages,
    });
  }
};

//CREATE
const createEstoque = async (req, res) => {
  // Parametros para criar o novo estoque
  const { nome } = req.body;

  try {
    //Criando o novo estoque
    const novoEstoque = await estoque.create({ nome: nome });

    //Resposta caso a criação seja bem sucedida
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Novo estoque criado", estoque: novoEstoque });
  } catch (error) {
    //Vetor auxiliar
    const errorMessages = [];

    //Filtra o erro de forma a colocar apenas a mensagem de erro principal
    //error.errors.forEach((x) => errorMessages.push(x.message));

    //Resposta com as mensagens individuais dos problemas ocorridos
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Algo deu errado ao tentar criar o novo estoque",
      errors: errorMessages,
    });
  }
};

//UPDATE
const updateEstoque = async (req, res) => {
  const { nomeAtual, nome } = req.body;

  try {
    //Criando o novo estoque
    const estoqueAtualizado = await estoque.update({
      nome: nome,
      where: { nome: nomeAtual },
    });

    //Resposta caso a atualização seja bem sucedida
    res
      .status(StatusCodes.OK)
      .json({ msg: "Estoque atualizado", estoque: estoqueAtualizado });
  } catch (error) {
    //Vetor auxiliar
    const errorMessages = [];

    //Filtra o erro de forma a colocar apenas a mensagem de erro principal
    //error.errors.forEach((x) => errorMessages.push(x.message));

    //Resposta com as mensagens individuais dos problemas ocorridos
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Algo deu errado ao tentar atualizar o estoque",
      errors: errorMessages,
    });
  }
};

//DELETE
const deleteEstoque = async (req, res) => {
  const { nome } = req.body;

  try {
    //Deletando estoque
    await estoque.destroy({
      where: { nome: nome },
    });

    //Resposta caso seja deletado
    res.status(StatusCodes.OK).json({ msg: "Estoque deletado" });
  } catch (error) {
    //Vetor auxiliar
    const errorMessages = [];

    //Filtra o erro de forma a colocar apenas a mensagem de erro principal
    //error.errors.forEach((x) => errorMessages.push(x.message));

    //Resposta com as mensagens individuais dos problemas ocorridos
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Algo deu errado ao tentar atualizar o estoque",
      errors: error,
    });
  }
};

const getSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const estoque = await estoque.findOne({ where: { id: id } });

    if (!estoque) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Elemento de id ${id} não encontrado` });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Elemento encontrado", estoque: estoque });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

module.exports = {
  createEstoque,
  updateEstoque,
  deleteEstoque,
  getEstoque,
  getSingle,
};
