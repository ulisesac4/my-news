const TemplateService = require("../services/templates");
module.exports = {
  create: async (req, res) => {
    const { name, content } = req.body;
    try {
      const template = await TemplateService.create(name, content);
      res.json({ template });
    } catch (error) {
      console.error("[Error] create template", error);
      res.status(400);
      res.send(error.message);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const rowsDeleted = await TemplateService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("[Error] destroy template", error);
      res.status(400);
      res.send(error.message);
    }
  },
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const template = await TemplateService.show(id);
      res.json({ template });
    } catch (error) {
      console.error("[Error] show template", error);
      res.status(400);
      res.send(error.message);
    }
  },
  showAll: async (req, res) => {
    try {
      const templates = await TemplateService.showAll();
      res.json({ templates });
    } catch (error) {
      console.error("[Error] index template", error);
      res.status(400);
      res.send(error.message);
    }
  },
  update: async (req, res) => {
    const { id, name, content } = req.body;
    try {
      const result = await TemplateService.update(id, name, content);
      res.json({ rowsUpdated: result[0] });
    } catch (error) {
      console.error("[Error] update template", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
