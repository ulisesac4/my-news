const Models = require("../../models");
const Issue = Models.Issue;
const Newsletter = Models.Newsletter;

module.exports = async (newsletterId) => {
  const newsletter = await Newsletter.findOne({ where: { id } });
  return newsletter.getIssues({
    order: [["publishDate", "desc"]],
    attributes: ["id", "name", "isSent", "publishDate"],
  });
};
