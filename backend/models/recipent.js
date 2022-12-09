"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Recipent.belongsToMany(models.Newsletter, {
        through: models.NewsletterRecipent,
      });
    }
  }
  Recipent.init(
    {
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recipent",
    }
  );
  return Recipent;
};