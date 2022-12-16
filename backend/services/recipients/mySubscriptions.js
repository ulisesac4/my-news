const Models = require("../../models");
const Recipient = Models.Recipient;
const NewsletterRecipient = Models.NewsletterRecipient;
const Newsletter = Models.Newsletter;

module.exports = async (email) => {
  const recipient = await Recipient.findOne({ where: { email } });
  const newsletterRecipients = await NewsletterRecipient.findAll({
    where: { RecipientId: recipient.id },
    include: [{ model: Newsletter }],
  });

  const data = newsletterRecipients.map((element) => {
    return {
      recipientId: recipient.id,
      newsletterId: element.Newsletter.id,
      name: element.Newsletter.name,
    };
  });

  return data;
};
