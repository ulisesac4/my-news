const Models = require("../../models");
const Issue = Models.Issue;
const Newsletter = Models.Newsletter;
const Template = Models.Template;
const Recipent = Models.Recipent;

module.exports = async (id) => {
  const issue = await Issue.findOne({
    where: { id },
    include: [
      { model: Newsletter, include: [{ model: Recipent }] },
      { model: Template },
    ],
  });
};
