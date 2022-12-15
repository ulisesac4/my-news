const Models = require("../../models");
const Issue = Models.Issue;

module.exports = async () => {
  const data = {};

  const { unsentCount, unsentRows } = await Issue.findAndCountAll({
    where: {
      isSent: false,
    },
    order: [["publishDate", "asc"]],
    limit: 5,
  });

  const { sentCount, sentRows } = await Issue.findAndCountAll({
    where: {
      isSent: true,
    },
    order: [["publishDate", "desc"]],
    limit: 5,
  });

  return data;
};
