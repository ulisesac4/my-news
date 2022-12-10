"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Issue.belongsTo(models.Newsletter);
      models.Issue.belongsTo(models.Template);
    }
  }
  Issue.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      attachments: DataTypes.TEXT,
      isSent: DataTypes.BOOLEAN,
      publishDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Issue",
    }
  );
  return Issue;
};
