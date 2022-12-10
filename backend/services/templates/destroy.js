const Models = require("../../models");
const Template = Models.Template;

module.exports = async (id) => {
  return Template.destroy({ where: { id } });
};
