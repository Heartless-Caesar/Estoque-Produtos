const express = require("express");
const app = express();
const { authMiddleware } = require("./Middleware/authMiddleware");
const { inventoryRouter } = require("./Routes/inventory_routes");
const { productRouter } = require("./Routes/product_routes");
const { authRouter } = require("./Routes/auth_routes");
const { sequelize } = require("./Data/models/index");
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({ force: true }));
app.use(bodyParser.json());

app.use(authRouter);
app.use(authMiddleware, inventoryRouter, productRouter);

const start = async (req, res) => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`App listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
