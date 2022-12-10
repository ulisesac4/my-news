const Models = require("../../models");
const Newsletter = Models.Newsletter;

module.exports = async () => {
  return Newsletter.findAll({ order: [["name", "asc"]] });
};
