const Models = require("../../models");
const Template = Models.Template;

module.exports = async () => {
  return Template.findAll({
    order: [["name", "ASC"]],
    attributes: ["id", "name", "content"],
  });
};
