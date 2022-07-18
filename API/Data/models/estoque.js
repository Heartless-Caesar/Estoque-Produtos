"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      estoque.hasMany(models.produto);
    }
  }
  estoque.init(
    {
      nome: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "estoque",
    }
  );
  return estoque;
};
