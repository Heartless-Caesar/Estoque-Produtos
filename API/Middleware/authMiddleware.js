const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No auth header found" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: user.id, username: user.username };

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Something went wrong in auth verification middleware",
    });
  }
};

module.exports = { authMiddleware };
