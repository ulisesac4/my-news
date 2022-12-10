const { AttachmentSeralizer } = require("../../common");
const Models = require("../../models");
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
  return Issue.update(
    {
      name,
      content,
      attachments,
      publishDate,
      isSent,
      newsletterId,
      templateId,
    },
    { where: { id } }
  );
};
