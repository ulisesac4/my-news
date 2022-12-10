const Models = require("../../models");
const Template = Models.Template;

module.exports = async (id, name, content) => {
  return Template.update({ name, content }, { where: { id } });
};
