const { AttachmentSeralizer } = require("../../common");
const Models = require("../../models");
const Issue = Models.Issue;

module.exports = async (
  name,
  content,
  attachments,
  newsletterId,
  templateId
) => {
  attachments = AttachmentSeralizer.serialize(attachments);
  return Issue.create({ name, content, attachments, newsletterId, templateId });
};
