const Models = require("../../models");
const Newsletter = Models.Newsletter;

module.exports = async (id, name) => {
  return Newsletter.update({ name }, { where: { id } });
};
