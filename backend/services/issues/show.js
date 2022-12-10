const Models = require("../../models");
const Issue = Models.Issue;

module.exports = async (id) => {
  let issue = Issue.findOne({ where: { id } });
  issue = JSON.parse(JSON.stringify(issue));
  issue.attachments = JSON.parse(issue.attachments);
  return issue;
};
