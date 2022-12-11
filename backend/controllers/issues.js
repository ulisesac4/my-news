const IssueService = require("../services/issues");
module.exports = {
  /**
   * @openapi
   * /issues:
   *  post:
   *     tags:
   *     - Issue
   *     description: Create an Issue
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The Issue's name.
   *                 example: My-Issue
   *               content:
   *                 type: string
   *                 description: The Issue's html content without taking in mind the Template html.
   *                 example: My-Issue
   *               attachments:
   *                 type: string
   *                 description: The Issue's attachments in array form.
   *                 example: My-Issue
   *               publishDate:
   *                 type: string
   *                 description: The Issue's publish date.
   *                 example: My-Issue
   *               isSent:
   *                 type: string
   *                 description: The Issue's state of being sent.
   *                 example: My-Issue
   *               newsletterId:
   *                 type: string
   *                 description: The Newsletter id where this Issue is put at.
   *                 example: My-Issue
   *               templateId:
   *                 type: string
   *                 description: The Template id where this Issue is put at.
   *                 example: My-Issue
   *             required:
   *               - name
   *     responses:
   *       200:
   *         description: API has created succesfully the Issue
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 issue:
   *                   type: object
   *                   properties:
   *                    id:
   *                      type: integer
   *                      description: The create Issue ID.
   *                      example: 1
   *                    name:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    content:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    attachments:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    publishDate:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    isSent:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    NewsletterId:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    TemplateId:
   *                      type: string
   *                      description: The Issue's name.
   *                      example: My-Issue
   *                    createdAt:
   *                      type: string
   *                      description: The Issue's created hour in iso format.
   *                      example: 2022-12-06T00:53:42Z
   *                    updatedAt:
   *                      type: string
   *                      description: The Issue's updated hour in iso format.
   *                      example: 2022-12-06T00:53:42Z
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
   * /issues:
   *  delete:
   *     tags:
   *     - Issue
   *     description: Destroy an Issue only
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: text
   *                 description: The Issue's id.
   *                 example: 2
   *             required:
   *               - id
   *     responses:
   *       200:
   *         description: API has deleted succesfully the Issue
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsDeleted:
   *                   type: integer
   *                   description: The number of issues updated, normally must be 1 it may be 0 if it didn't updated.
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
  /**
   * @openapi
   * /issues/send:
   *  post:
   *     tags:
   *     - Issue
   *     description: Sends an Issue
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: text
   *                 description: The Issue's id.
   *                 example: 2
   *             required:
   *               - id
   *     responses:
   *       200:
   *         description: API has sent succesfully the Issue
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 isSent:
   *                   type: booelan
   *                   description: Checks if the issue was sent or not
   *                   example: true
   *       400:
   *         description: An error has ocurred
   *         content:
   *           text/plain; charset=utf-8:
   *             schema:
   *               type: string
   *               example: name is invalid
   */
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
  /**
   * @openapi
   * /issues/issue/{id}:
   *  get:
   *     tags:
   *     - Issue
   *     description: Get one Issues of
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: The Issue's id.
   *         example: 2
   *     responses:
   *       200:
   *         description: API has fetched succesfully the Issue
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 issue:
   *                   type: object
   *                   properties:
   *                       id:
   *                        type: integer
   *                        description: The create Issue ID.
   *                        example: 1
   *                       name:
   *                        type: string
   *                        description: The Issue's name.
   *                        example: My Issue #1
   *                       content:
   *                        type: string
   *                        description: The Issue's html content without taking in mind the Template html.
   *                       attachments:
   *                        type: array
   *                        description: The Issue's attachments in array form.
   *                        example: [{filename: "name.jpg", content: "The buffer of that file"}]
   *                       publishDate:
   *                        type: string
   *                        description: The Issue's publish date.
   *                        example: 2022-12-06T00:53:42Z
   *                       isSent:
   *                        type: string
   *                        description: The Issue's state of being sent.
   *                        example: false
   *                       NewsletterId:
   *                        type: string
   *                        description: The Newsletter id where this Issue is put at.
   *                        example: 1
   *                       TemplateId:
   *                        type: string
   *                        description: The Template id where this Issue is put at.
   *                        example: 2
   *                       createdAt:
   *                        type: string
   *                        description: The Issue's created hour in iso format.
   *                        example: 2022-12-06T00:53:42Z
   *                       updatedAt:
   *                        type: string
   *                        description: The Issue's updated hour in iso format.
   *                        example: 2022-12-06T00:53:42Z
   *       400:
   *         description: An error has ocurred
   *         content:
   *           text/plain; charset=utf-8:
   *             schema:
   *               type: string
   *               example: name is invalid
   */
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
   * /issues/{newsletterId}:
   *  get:
   *     tags:
   *     - Issue
   *     description: Get all Issues of a Newsletter
   *     parameters:
   *       - in: path
   *         name: newsletterId
   *         schema:
   *           type: integer
   *         required: true
   *         description: The Newsletter's id.
   *         example: 2
   *     responses:
   *       200:
   *         description: API has fetched succesfully the Issues
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 issues:
   *                   type: array
   *                   items:
   *                     properties:
   *                       id:
   *                        type: integer
   *                        description: The create Issue ID.
   *                        example: 1
   *                       name:
   *                        type: string
   *                        description: The Issue's name.
   *                        example: My Issue #1
   *                       content:
   *                        type: string
   *                        description: The Issue's html content without taking in mind the Template html.
   *                       attachments:
   *                        type: string
   *                        description: The Issue's attachments in array form.
   *                        example: [{filename: "name.jpg", content: "The buffer of that file"}]
   *                       publishDate:
   *                        type: string
   *                        description: The Issue's publish date.
   *                        example: 2022-12-06T00:53:42Z
   *                       isSent:
   *                        type: string
   *                        description: The Issue's state of being sent.
   *                        example: false
   *                       NewsletterId:
   *                        type: string
   *                        description: The Newsletter id where this Issue is put at.
   *                        example: 1
   *                       TemplateId:
   *                        type: string
   *                        description: The Template id where this Issue is put at.
   *                        example: 2
   *                       createdAt:
   *                        type: string
   *                        description: The Issue's created hour in iso format.
   *                        example: 2022-12-06T00:53:42Z
   *                       updatedAt:
   *                        type: string
   *                        description: The Issue's updated hour in iso format.
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
   * /issues:
   *  patch:
   *     tags:
   *     - Issue
   *     description: Update an Issue
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
   *                 description: The create Issue ID.
   *                 example: 1
   *               name:
   *                 type: string
   *                 description: The Issue's name.
   *                 example: My Issue #1
   *               content:
   *                 type: string
   *                 description: The Issue's html content without taking in mind the Template html.
   *               attachments:
   *                 type: string
   *                 description: The Issue's attachments in array form.
   *                 example: [{filename: "name.jpg", content: "The buffer of that file"}]
   *               publishDate:
   *                 type: string
   *                 description: The Issue's publish date.
   *                 example: 2022-12-06T00:53:42Z
   *               isSent:
   *                 type: string
   *                 description: The Issue's state of being sent.
   *                 example: false
   *               newsletterId:
   *                 type: string
   *                 description: The Newsletter id where this Issue is put at.
   *                 example: 1
   *               templateId:
   *                 type: string
   *                 description: The Template id where this Issue is put at.
   *                 example: 2
   *             required:
   *               - id
   *               - name
   *     responses:
   *       200:
   *         description: API has updated succesfully the Issue
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsUpdated:
   *                   type: integer
   *                   description: The number of issues updated, normally must be 1 it may be 0 if it didn't updated.
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
