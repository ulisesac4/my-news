const Models = require("../../models");
const Issue = Models.Issue;

module.exports = async () => {
  /**
     * IO.inspect("Loading unsent Newsletters...")
    newsletters = Newsletters.list_unsend_newsletters()

    Enum.map(newsletters, fn newsletter -> schedule_one_newsletter(newsletter) end)

    IO.inspect("Unsent Newsletters loaded...")
     */
  console.log("Loading unsent Newsletters...");

  const unpublishedIssues = await Issue.findAll({
    order: [["publishDate", "desc"]],
    where: { isSent: false },
    attributes: ["id", "publishDate", "isSent"],
  });

  console.log("Unsent Newsletters loaded...");

  return unpublishedIssues;
};
