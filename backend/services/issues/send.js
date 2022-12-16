const { NodemailerInstance } = require("../../common");
const Models = require("../../models");
const Issue = Models.Issue;
const Newsletter = Models.Newsletter;
const Template = Models.Template;
const Recipient = Models.Recipient;

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString(); // Regular expression to identify HTML tags in // the input string. Replacing the identified // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

module.exports = async (id) => {
  const issue = await Issue.findOne({
    where: { id },
    include: [
      { model: Newsletter, include: [{ model: Recipient }] },
      { model: Template },
    ],
  });
  const tempIssue = issue.Template.content.replace(
    ">>!content!<<",
    issue.content
  );

  const promiseSendEmail = issue.Newsletter.Recipients.map((recipient) => {
    return NodemailerInstance.sendMail({
      from: process.env.EMAIL_SENDER,
      to: recipient.email,
      subject: issue.name,
      text: removeTags(issue.content),
      html: tempIssue.replace(
        ">>>{UNSUBSCRIBE}<<<",
        `http://localhost:${8765}/unsubscribe/${recipient.email}`
      ),
      attachments: JSON.parse(issue.attachments),
    });
  });
  await Promise.all(promiseSendEmail);

  await Issue.update({ isSent: true }, { where: { id } });

  return id;
};
