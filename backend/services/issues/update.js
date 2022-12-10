const { AttachmentSeralizer } = require("../../common");
const Models = require("../../models");
const hydratePending = require("./hydratePending");
const Issue = Models.Issue;

module.exports = async (
  id,
  name,
  content,
  attachments,
  publishDate,
  isSent,
  newsletterId,
  templateId
) => {
  attachments = AttachmentSeralizer.serialize(attachments);
  const issue = Issue.update(
    {
      name,
      content,
      attachments: JSON.stringify(attachments),
      publishDate,
      isSent,
      newsletterId,
      templateId,
    },
    { where: { id } }
  );

  hydratePending()
    .then((success) => {
      console.log("Have correctly hydrated unsent issues at issue update");
    })
    .catch((err) => {
      console.error(
        "[Err] Something happened while hydrating pending issues",
        err
      );
    });

  return issue;
};
