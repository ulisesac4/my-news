const TemplateService = require("../services/templates");
module.exports = {
  /**
   * @openapi
   * /templates:
   *  post:
   *     tags:
   *     - Template
   *     description: Create an Template
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The Template's name.
   *                 example: My-Template
   *             required:
   *               - name
   *     responses:
   *       200:
   *         description: API has created succesfully the Template
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 template:
   *                   type: object
   *                   properties:
   *                    id:
   *                     type: integer
   *                     description: The create Template ID.
   *                     example: 1
   *                    name:
   *                     type: string
   *                     description: The Template's name.
   *                     example: My-Template
   *                    createdAt:
   *                     type: string
   *                     description: The Template's created hour in iso format.
   *                     example: 2022-12-06T00:53:42Z
   *                    updatedAt:
   *                     type: string
   *                     description: The Template's updated hour in iso format.
   *                     example: 2022-12-06T00:53:42Z
   *       400:
   *         description: An error has ocurred
   *         content:
   *           text/plain; charset=utf-8:
   *             schema:
   *               type: string
   *               example: name is invalid
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
   * /templates:
   *  delete:
   *     tags:
   *     - Template
   *     description: Destroy an Template only, issues and recipients will remain but will become inaccesible
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: text
   *                 description: The Template's id.
   *                 example: 2
   *             required:
   *               - id
   *     responses:
   *       200:
   *         description: API has deleted succesfully the Template
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsDeleted:
   *                   type: integer
   *                   description: The number of templates updated, normally must be 1 it may be 0 if it didn't updated.
   *                   example: 1
   *       400:
   *         description: An error has ocurred
   *         content:
   *           text/plain; charset=utf-8:
   *             schema:
   *               type: string
   *               example: name is invalid
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
   * /templates:
   *  get:
   *     tags:
   *     - Template
   *     description: Get all Templates
   *
   *     responses:
   *       200:
   *         description: API has fetched succesfully the Templates
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 templates:
   *                   type: array
   *                   items:
   *                     properties:
   *                       id:
   *                         type: integer
   *                         description: The Template's ID.
   *                         example: 1
   *                       name:
   *                         type: string
   *                         description: The Template's name.
   *                         example: My-Template
   *                       createdAt:
   *                        type: string
   *                        description: The Template's created hour in iso format.
   *                        example: 2022-12-06T00:53:42Z
   *                       updatedAt:
   *                        type: string
   *                        description: The Template's updated hour in iso format.
   *                        example: 2022-12-06T00:53:42Z
   *       400:
   *         description: An error has ocurred
   *         content:
   *           text/plain; charset=utf-8:
   *             schema:
   *               type: string
   *               example: name is invalid
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
   * /templates:
   *  patch:
   *     tags:
   *     - Template
   *     description: Update an Template
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *                 description: The Template's ID to update.
   *                 example: 1
   *               name:
   *                 type: string
   *                 description: The Template's name.
   *                 example: My-Template
   *             required:
   *               - id
   *               - name
   *     responses:
   *       200:
   *         description: API has updated succesfully the Template
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsUpdated:
   *                   type: integer
   *                   description: The number of templates updated, normally must be 1 it may be 0 if it didn't updated.
   *                   example: 1
   *
   *       400:
   *         description: An error has ocurred
   *         content:
   *           text/plain; charset=utf-8:
   *             schema:
   *               type: string
   *               example: name is invalid
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
