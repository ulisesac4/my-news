const Models = require("../../models");
const Recipient = Models.Recipient;

module.exports = async (emails, NewsletterId) => {
  const recipients = emails.map((email) => {
    return { email, NewsletterId };
  });
  return Recipient.bulkCreate(recipients);
};
