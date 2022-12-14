const Models = require("../../models");
const Recipient = Models.Recipient;

module.exports = async (id, newsletterId) => {
  const recipient = await Models.Recipient.findOne({ where: { id: id } });
  const newsletter = await Models.Newsletter.findOne({
    where: { id: newsletterId },
  });

  try {
    await newsletter.removeRecipient(recipient);
    return 1;
  } catch (error) {
    return 0;
  }
};
