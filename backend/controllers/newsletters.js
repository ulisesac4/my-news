const NewsletterService = require("../services/newsletters");
module.exports = {
  create: async (req, res) => {
    const { name } = req.body;
    try {
      const newsletter = await NewsletterService.create(name);
      res.json({ newsletter });
    } catch (error) {
      console.error("Err create newsletter", error);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const rowsDeleted = await NewsletterService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("Err destroy newsletter", error);
    }
  },
  showAll: async (req, res) => {
    try {
      const newsletters = await NewsletterService.showAll();
      res.json({ newsletters });
    } catch (error) {
      console.error("Err index newsletter", error);
    }
  },
  update: async (req, res) => {
    const { id, name } = req.body;
    try {
      const result = await NewsletterService.update(id, name);
      res.json({ rowsUpdated: result[0] });
    } catch (error) {
      console.error("Err update newsletter", error);
    }
  },
};
