"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Recipient.belongsToMany(models.Newsletter, {
        through: models.NewsletterRecipient,
      });
    }
  }
  Recipient.init(
    {
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recipient",
    }
  );
  return Recipient;
};
