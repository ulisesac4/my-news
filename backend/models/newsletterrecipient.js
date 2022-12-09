"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NewsletterRecipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.NewsletterRecipient.belongsTo(models.Newsletter);
      models.NewsletterRecipient.belongsTo(models.Recipient);
    }
  }
  NewsletterRecipient.init(
    {},
    {
      sequelize,
      modelName: "NewsletterRecipient",
    }
  );
  return NewsletterRecipient;
};
