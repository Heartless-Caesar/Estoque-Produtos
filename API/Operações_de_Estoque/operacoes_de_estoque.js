const { StatusCodes } = require("http-status-codes");
const { estoque } = require("../Data/models");

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
    error.errors.forEach((x) => errorMessages.push(x.message));

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
    error.errors.forEach((x) => errorMessages.push(x.message));

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
    error.errors.forEach((x) => errorMessages.push(x.message));

    //Resposta com as mensagens individuais dos problemas ocorridos
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Algo deu errado ao tentar atualizar o estoque",
      errors: errorMessages,
    });
  }
};

module.exports = { createEstoque, updateEstoque, deleteEstoque };
