const Models = require("../../models");
const Newsletter = Models.Newsletter;

module.exports = async (id) => {
  return Newsletter.destroy({ where: { id } });
};
