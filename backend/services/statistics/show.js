const Models = require("../../models");
const Issue = Models.Issue;

module.exports = async () => {
  const data = {
    sent: { name: "", date: "" },
    amountSent: 0,
    unsent: { name: "", date: "" },
    amountUnset: 0,
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
  data.sent.name = sent[0].name;
  data.sent.date = sent[0].publishDate;
  data.unsent.name = unsent[0].name;
  data.unsent.date = unsent[0].publishDate;

  return data;
};
