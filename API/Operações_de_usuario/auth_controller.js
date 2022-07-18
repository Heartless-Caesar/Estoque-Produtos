const { StatusCodes } = require("http-status-codes");
const { usuario } = require("../Data/models");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se já existe um usuário com o username desejado
    const checkDuplicate = await usuario.findOne({
      where: { username: username },
    });

    //Retorno em caso de tentativa de duplicação de username
    if (checkDuplicate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Já existe um usuário com este username" });
    }

    //Hashing da senha do usuário
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Criação do usuário
    const novoUsuario = await usuario.create({
      username: username,
      password: hashedPassword,
    });

    //Retorno caso o post seja bem sucedido
    res
      .status(StatusCodes.OK)
      .json({ msg: "Novo usuário cadastrado", usuario: novoUsuario });
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

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Por favor providencie ambos credenciais" });
  }

  const usuarioDb = await usuario.findOne({ where: { username: username } });

  if (!usuarioDb) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `O usuário de username ${username} não existe` });
  }

  const comparacao = await bcrypt.compare(password, usuarioDb.password);

  if (!comparacao) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "A senha inserida não está correta" });
  }

  const token = jwt.sign(
    { id: usuarioDb.id, email: usuarioDb.password },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.status(StatusCodes.OK).json({
    msg: "usuario logado",
    usuario: usuarioDb.username,
    token: token,
  });
};

module.exports = { registerUser, userLogin };
