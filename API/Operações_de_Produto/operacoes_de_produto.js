const { StatusCodes } = require("http-status-codes");
const { produto, estoque } = require("../Data/models");

const createProduct = async (req, res) => {
  //Campos para preencher
  const { nome, preco, quantidade, nomeEstoque } = req.body;

  try {
    const entryExists = await produto.findOne({ where: { nome: nome } });

    //Caso um produto com o mesmo nome exista ele será atualizado
    if (entryExists) {
      entryExists.quantidade += quantidade;
      entryExists.preco = preco;
      await entryExists.save();

      return res
        .status(StatusCodes.OK)
        .json({ msg: "Produto atualizado", produto: entryExists });
    }

    //Encontra o estoque desejado
    const estoqueSelecionado = await estoque.findOne({
      where: { nome: nomeEstoque },
    });

    //Criacao da entrada
    const novaEntrada = await produto.create({
      nome: nome,
      preco: preco,
      quantidade: quantidade,
      estoqueId: estoqueSelecionado.id,
    });

    //Resposta caso criação seja bem sucedida
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Nova entrada de produto realizado", produto: novaEntrada });
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

//UPDATE CONTROLLER
const updateProduct = async (req, res) => {
  //Inputs para atualizar
  const { nome, preco, quantidade } = req.body;

  try {
    //Verifica se o produto existe ou não
    const entryExists = await produto.findOne({ where: { nome: nome } });

    //Se o produto informado não existir a operação é encerrada
    if (!entryExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "O produto informado não existe" });
    }

    //Atualizando o produto caso ele exista
    const updatedProduct = await produto.update({
      nome: nome,
      quantidade: quantidade,
      preco: preco,
      where: { nome: nome },
    });

    //Resposta caso seja atualizado com sucesso
    res
      .status(StatusCodes.OK)
      .json({ msg: "Produto atualizado", produto: updatedProduct });
  } catch (error) {
    //Vetor auxiliar
    const errorMessages = [];

    //Filtra o erro de forma a colocar apenas a mensagem de erro principal
    error.errors.forEach((x) => errorMessages.push(x.message));

    //Resposta com as mensagens individuais dos problemas ocorridos
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Algo deu errado ao tentar atualizar o produto",
      errors: errorMessages,
    });
  }
};
