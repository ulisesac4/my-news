const Models = require("../../models");
const Recipient = Models.Recipient;
const Newsletter = Models.Newsletter;
module.exports = async (emails, NewsletterId) => {
  const recipients = emails.map((email) => {
    return { email, NewsletterId };
  });

  const newsletter = await Newsletter.findOne({
    where: { id: NewsletterId },
  });
  const recipientPromisedData = recipients.map(async (recipientElement) => {
    let recipient = await Recipient.findOne({
      where: { email: recipientElement.email },
    });
    if (!recipient) {
      recipient = await Recipient.create({ email: recipient.email });
    }
    await newsletter.addRecipient(recipient);
    return recipient;
  });
  const newRecipients = await Promise.all(recipientPromisedData);
  return newRecipients;
};
