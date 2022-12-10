const Models = require("../../models");
const Template = Models.Template;

module.exports = async (name, content) => {
  return Template.create({ name, content });
};
