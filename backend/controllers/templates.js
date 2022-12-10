const TemplateService = require("../services/templates");
module.exports = {
  /**
   * @openapi
   * /issues:
   *  post:
   *     tags:
   *     - Issue
   *     description: Create an Issue and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Issue
   */
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
  /**
   * @openapi
   * /issues:
   *  post:
   *     tags:
   *     - Issue
   *     description: Create an Issue and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Issue
   */
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
  /**
   * @openapi
   * /issues:
   *  post:
   *     tags:
   *     - Issue
   *     description: Create an Issue and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Issue
   */
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
  /**
   * @openapi
   * /issues:
   *  post:
   *     tags:
   *     - Issue
   *     description: Create an Issue and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Issue
   */
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
  /**
   * @openapi
   * /issues:
   *  post:
   *     tags:
   *     - Issue
   *     description: Create an Issue and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Issue
   */
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
