const IssueService = require("../services/issues");
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
   *             required:
   *               - name
   *     responses:
   *       200:
   *         description: API has created succesfully the Newsletter
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 newsletter:
   *                   type: object
   *                   properties:
   *                    id:
   *                     type: integer
   *                     description: The create Newsletter ID.
   *                     example: 1
   *                    name:
   *                     type: string
   *                     description: The Newsletter's name.
   *                     example: My-Newsletter
   *                    createdAt:
   *                     type: string
   *                     description: The Newsletter's created hour in iso format.
   *                     example: 2022-12-06T00:53:42Z
   *                    updatedAt:
   *                     type: string
   *                     description: The Newsletter's updated hour in iso format.
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
  /**
   * @openapi
   * /newsletters:
   *  delete:
   *     tags:
   *     - Newsletter
   *     description: Destroy an Newsletter only, issues and recipients will remain but will become inaccesible
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: text
   *                 description: The Newsletter's id.
   *                 example: 2
   *             required:
   *               - id
   *     responses:
   *       200:
   *         description: API has deleted succesfully the Newsletter
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsDeleted:
   *                   type: integer
   *                   description: The number of newsletters updated, normally must be 1 it may be 0 if it didn't updated.
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
      const rowsDeleted = await IssueService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("[Error] destroy issue", error);
      res.status(400);
      res.send(error.message);
    }
  },
  send: async (req, res) => {
    const { id } = req.body;
    try {
      const idSent = await IssueService.send(id);
      res.json({ idSent });
    } catch (error) {
      console.error("[Error] send issue", error);
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
  /**
   * @openapi
   * /newsletters:
   *  get:
   *     tags:
   *     - Newsletter
   *     description: Get all Newsletters
   *
   *     responses:
   *       200:
   *         description: API has fetched succesfully the Newsletters
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 newsletters:
   *                   type: array
   *                   items:
   *                     properties:
   *                       id:
   *                         type: integer
   *                         description: The Newsletter's ID.
   *                         example: 1
   *                       name:
   *                         type: string
   *                         description: The Newsletter's name.
   *                         example: My-Newsletter
   *                       createdAt:
   *                        type: string
   *                        description: The Newsletter's created hour in iso format.
   *                        example: 2022-12-06T00:53:42Z
   *                       updatedAt:
   *                        type: string
   *                        description: The Newsletter's updated hour in iso format.
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
  /**
   * @openapi
   * /newsletters:
   *  patch:
   *     tags:
   *     - Newsletter
   *     description: Update an Newsletter
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *                 description: The Newsletter's ID to update.
   *                 example: 1
   *               name:
   *                 type: string
   *                 description: The Newsletter's name.
   *                 example: My-Newsletter
   *             required:
   *               - id
   *               - name
   *     responses:
   *       200:
   *         description: API has updated succesfully the Newsletter
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsUpdated:
   *                   type: integer
   *                   description: The number of newsletters updated, normally must be 1 it may be 0 if it didn't updated.
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
