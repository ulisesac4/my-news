const RecipientService = require("../services/recipients");
module.exports = {
  create: async (req, res) => {
    const { emails, newsletterId } = req.body;
    try {
      const recipients = await RecipientService.create(emails, newsletterId);
      res.json({ recipients });
    } catch (error) {
      console.error("[Error] create recipient", error);
      res.status(400);
      res.send(error.message);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const rowsDeleted = await RecipientService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("[Error] destroy recipient", error);
      res.status(400);
      res.send(error.message);
    }
  },
  showAll: async (req, res) => {
    const { newsletterId } = req.params;
    try {
      const recipients = await RecipientService.showAll(newsletterId);
      res.json({ recipients });
    } catch (error) {
      console.error("[Error] index recipient", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
