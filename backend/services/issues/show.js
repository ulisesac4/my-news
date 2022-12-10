const Models = require("../../models");
const Issue = Models.Issue;

module.exports = async (id) => {
  return Issue.findOne({ where: { id } });
};
