const { sequelize } = require("./Data/models/index");
const express = require("express");
const app = express();
const port = 5000;

try {
  app.listen(port, () => {
    await sequelize.sync({force : true})
    console.log(`App listening on port ${port}...`);
  });
} catch (error) {
    console.log(error);
}
