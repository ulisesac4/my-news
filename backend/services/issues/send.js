const { NodemailerInstance } = require("../../common");
const Models = require("../../models");
const Issue = Models.Issue;
const Newsletter = Models.Newsletter;
const Template = Models.Template;
const Recipent = Models.Recipent;

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString(); // Regular expression to identify HTML tags in // the input string. Replacing the identified // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

module.exports = async (id) => {
  const issue = await Issue.findOne({
    where: { id },
    include: [
      { model: Newsletter, include: [{ model: Recipent }] },
      { model: Template },
    ],
  });

  await NodemailerInstance.sendMail({
    from: process.env.EMAIL_SENDER,
    to: issue.Newsletter.Recipients.map((recipient) => {
      return recipient.email;
    }).join(", "),
    subject: issue.name,
    text: removeTags(issue.content),
    html: issue.Template.content.replace(">>!content!<<", issue.content),
    attachments: JSON.parse(issue.attachments),
  });

  await Issue.update({ isSent: true }, { where: { id } });

  return id;
};
