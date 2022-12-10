const Models = require("../../models");
const Newsletter = Models.Newsletter;

module.exports = async (name) => {
  return Newsletter.create({ name });
};
