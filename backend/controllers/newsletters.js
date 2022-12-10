const NewsletterService = require("../services/newsletters");
module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    try {
      const newsletter = await NewsletterService.create(name);
      res.json({ newsletter });
    } catch (error) {
      console.error("Err create newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const rowsDeleted = await NewsletterService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("Err destroy newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
  showAll: async (req, res) => {
    try {
      const newsletters = await NewsletterService.showAll();
      res.json({ newsletters });
    } catch (error) {
      console.error("Err index newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
  update: async (req, res) => {
    const { id, name } = req.body;
    try {
      const result = await NewsletterService.update(id, name);
      res.json({ rowsUpdated: result[0] });
    } catch (error) {
      console.error("Err update newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
