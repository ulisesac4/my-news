const { getWeek, sub, startOfWeek, endOfWeek } = require("date-fns");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Models = require("../../models");
const Issue = Models.Issue;
const NewsletterRecipient = Models.NewsletterRecipient;

const countRecipients = async (startOfCurrentWeek) => {
  const recipients = await NewsletterRecipient.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(startOfCurrentWeek),
        [Op.lte]: new Date(endOfWeek(startOfCurrentWeek)),
      },
    },
  });
  return recipients.length;
};

module.exports = async () => {
  const data = {
    sent: { name: "To be planned", date: "To be planned" },
    amountSent: 0,
    unsent: { name: "To be planned", date: "To be planned" },
    amountUnset: 0,

    weeks: [],
    entries: [],
  };

  const unsent = await Issue.findAll({
    where: {
      isSent: false,
    },
    order: [["publishDate", "asc"]],
    limit: 5,
  });

  const sent = await Issue.findAll({
    where: {
      isSent: true,
    },
    order: [["publishDate", "desc"]],
    limit: 5,
  });

  const unsentCount = await Issue.findAll({
    where: {
      isSent: false,
    },
    attributes: ["id", "isSent"],
  });

  const sentCount = await Issue.findAll({
    where: {
      isSent: true,
    },
    attributes: ["id", "isSent"],
  });

  //console.log(sentCount, unsentCount, sentRows);
  data.amountSent = sentCount.length;
  data.amountUnset = unsentCount.length;
  try {
    data.sent.name = sent[0].name;
    data.sent.date = sent[0].publishDate;
  } catch (error) {}
  try {
    data.unsent.name = unsent[0].name;
    data.unsent.date = unsent[0].publishDate;
  } catch (error) {}

  const currentDate = new Date();
  const startOfCurrentWeek = startOfWeek(currentDate);
  const startOfWeekMinus1 = sub(startOfCurrentWeek, { weeks: 1 });
  const startOfWeekMinus2 = sub(startOfWeekMinus1, { weeks: 1 });
  const startOfWeekMinus3 = sub(startOfWeekMinus2, { weeks: 1 });
  const startOfWeekMinus4 = sub(startOfWeekMinus3, { weeks: 1 });

  data.weeks = [
    startOfCurrentWeek,
    startOfWeekMinus1,
    startOfWeekMinus2,
    startOfWeekMinus3,
    startOfWeekMinus4,
  ];

  data.entries = [
    await countRecipients(startOfCurrentWeek),
    await countRecipients(startOfWeekMinus1),
    await countRecipients(startOfWeekMinus2),
    await countRecipients(startOfWeekMinus3),
    await countRecipients(startOfWeekMinus4),
  ];

  return data;
};
