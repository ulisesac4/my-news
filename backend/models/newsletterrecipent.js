"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NewsletterRecipent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.NewsletterRecipent.belongsTo(models.Newsletter);
      models.NewsletterRecipent.belongsTo(models.Recipent);
    }
  }
  NewsletterRecipent.init(
    {},
    {
      sequelize,
      modelName: "NewsletterRecipent",
    }
  );
  return NewsletterRecipent;
};
