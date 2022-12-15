const { AttachmentSeralizer } = require("../../common");
const Models = require("../../models");
const hydratePending = require("./hydratePending");
const Issue = Models.Issue;

module.exports = async (
  name,
  content,
  attachments,
  publishDate,
  isSent,
  NewsletterId,
  TemplateId
) => {
  attachments = AttachmentSeralizer.serialize(attachments);
  const issue = Issue.create({
    name,
    content,
    attachments: JSON.stringify(attachments),
    publishDate,
    isSent,
    NewsletterId,
    TemplateId,
  });

  hydratePending()
    .then((success) => {
      console.log("Have correctly hydrated unsent issues at issue creation");
    })
    .catch((err) => {
      console.error(
        "[Err] Something happened while hydrating pending issues",
        err
      );
    });

  return issue;
};
