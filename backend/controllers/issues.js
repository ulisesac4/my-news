const IssueService = require("../services/issues");
module.exports = {
  create: async (req, res) => {
    const {
      name,
      content,
      attachments,
      publishDate,
      isSent,
      newsletterId,
      templateId,
    } = req.body;
    try {
      const issue = await IssueService.create(
        name,
        content,
        attachments,
        publishDate,
        isSent,
        newsletterId,
        templateId
      );
      res.json({ issue });
    } catch (error) {
      console.error("[Error] create issue", error);
      res.status(400);
      res.send(error.message);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const rowsDeleted = await IssueService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("[Error] destroy issue", error);
      res.status(400);
      res.send(error.message);
    }
  },
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const issue = await IssueService.show(id);
      res.json({ issue });
    } catch (error) {
      console.error("[Error] show issue", error);
      res.status(400);
      res.send(error.message);
    }
  },
  showAll: async (req, res) => {
    const { newsletterId } = req.params;
    try {
      const issues = await IssueService.showAll(newsletterId);
      res.json({ issues });
    } catch (error) {
      console.error("[Error] index issue", error);
      res.status(400);
      res.send(error.message);
    }
  },
  update: async (req, res) => {
    const {
      id,
      name,
      content,
      attachments,
      publishDate,
      isSent,
      newsletterId,
      templateId,
    } = req.body;
    try {
      const result = await IssueService.update(
        id,
        name,
        content,
        attachments,
        publishDate,
        isSent,
        newsletterId,
        templateId
      );
      res.json({ rowsUpdated: result[0] });
    } catch (error) {
      console.error("[Error] update issue", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
