const { sequelize } = require("./Data/models/index");
const express = require("express");
const app = express();
const port = 5000;

const start = async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`App listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
