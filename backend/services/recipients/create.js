const Models = require("../../models");
const Recipient = Models.Recipient;

module.exports = async (emails, newsletterId) => {
  const recipients = emails.map((email) => {
    return { email, newsletterId };
  });
  return Recipient.bulkCreate(recipients);
};
