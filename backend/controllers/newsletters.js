const NewsletterService = require("../services/newsletters");
module.exports = {
  /**
   * @openapi
   * /newsletters:
   *  post:
   *     tags:
   *     - Newsletter
   *     description: Create an Newsletter
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The Newsletter's name.
   *                 example: My-Newsletter
   *     responses:
   *       200:
   *         description: API has created succesfully the Newsletter
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: The create Newsletter ID.
   *                   example: 1
   *                 name:
   *                   type: string
   *                   description: The Newsletter's name.
   *                   example: My-Newsletter
   *                 createdAt:
   *                   type: string
   *                   description: The Newsletter's created hour in iso format.
   *                   example: 2022-12-06T00:53:42Z
   *                 updatedAt:
   *                   type: string
   *                   description: The Newsletter's updated hour in iso format.
   *                   example: 2022-12-06T00:53:42Z
   */
  create: async (req, res) => {
    const { name } = req.body;
    try {
      const newsletter = await NewsletterService.create(name);
      res.json({ newsletter });
    } catch (error) {
      console.error("[Error] create newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
  /**
   * @openapi
   * /newsletters:
   *  delete:
   *     tags:
   *     - Newsletter
   *     description: Create an Newsletter and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Newsletter
   */
  destroy: async (req, res) => {
    const { id } = req.body;
    try {
      const rowsDeleted = await NewsletterService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("[Error] destroy newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
  /**
   * @openapi
   * /newsletters:
   *  get:
   *     tags:
   *     - Newsletter
   *     description: Create an Newsletter and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Newsletter
   */
  showAll: async (req, res) => {
    try {
      const newsletters = await NewsletterService.showAll();
      res.json({ newsletters });
    } catch (error) {
      console.error("[Error] index newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
  /**
   * @openapi
   * /newsletters:
   *  patch:
   *     tags:
   *     - Newsletter
   *     description: Create an Newsletter and schedules it
   *     responses:
   *       200:
   *         description: API has created succesfully the Newsletter
   */
  update: async (req, res) => {
    const { id, name } = req.body;
    try {
      const result = await NewsletterService.update(id, name);
      res.json({ rowsUpdated: result[0] });
    } catch (error) {
      console.error("[Error] update newsletter", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
