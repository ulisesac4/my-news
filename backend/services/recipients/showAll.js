const Models = require("../../models");
const Newsletter = Models.Newsletter;

module.exports = async (newsletterId) => {
  const newsletter = await Newsletter.findOne({ where: { id: newsletterId } });
  console.log(await Models.Recipient.findAll());
  return newsletter.getRecipients({ order: [["email", "asc"]] });
};
