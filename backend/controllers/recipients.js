const RecipientService = require("../services/recipients");
module.exports = {
  /**
   * @openapi
   * /recipients:
   *  post:
   *     tags:
   *     - Recipient
   *     description: Create an Recipient
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                emails:
   *                  type: array
   *                  items:
   *                    type: string
   *                    example: "onemail@gmail.com"
   *                newsletterId:
   *                  description: The id of the Newsletter where these recipients will be put at.
   *                  type: string
   *                  example: 1
   *             required:
   *               - emails
   *               - newsletterId
   *     responses:
   *       200:
   *         description: API has created succesfully the Recipient
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 recipients:
   *                   type: object
   *                   properties:
   *                    id:
   *                     type: integer
   *                     description: The create Recipient ID.
   *                     example: 1
   *                    email:
   *                     type: string
   *                     description: The Recipient's email.
   *                     example: one-mail@gmail.com
   *                    createdAt:
   *                     type: string
   *                     description: The Recipient's created hour in iso format.
   *                     example: 2022-12-06T00:53:42Z
   *                    updatedAt:
   *                     type: string
   *                     description: The Recipient's updated hour in iso format.
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
    const { emails, newsletterId } = req.body;
    console.log(req.body);
    try {
      const recipients = await RecipientService.create(emails, newsletterId);
      res.json({ recipients });
    } catch (error) {
      console.error("[Error] create recipient", error);
      res.status(400);
      res.send(error.message);
    }
  },
  /**
   * @openapi
   * /recipients:
   *  delete:
   *     tags:
   *     - Recipient
   *     description: Destroy an Recipient only
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: text
   *                 description: The Recipient's id.
   *                 example: 2
   *             required:
   *               - id
   *     responses:
   *       200:
   *         description: API has deleted succesfully the Recipient
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 rowsDeleted:
   *                   type: integer
   *                   description: The number of recipients updated, normally must be 1 it may be 0 if it didn't updated.
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
      const rowsDeleted = await RecipientService.destroy(id);
      res.json({ rowsDeleted });
    } catch (error) {
      console.error("[Error] destroy recipient", error);
      res.status(400);
      res.send(error.message);
    }
  },
  /**
   * @openapi
   * /recipients:
   *  get:
   *     tags:
   *     - Recipient
   *     description: Get all Recipients
   *
   *     responses:
   *       200:
   *         description: API has fetched succesfully the Recipients
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 recipients:
   *                   type: object
   *                   properties:
   *                    id:
   *                     type: integer
   *                     description: The create Recipient ID.
   *                     example: 1
   *                    email:
   *                     type: string
   *                     description: The Recipient's email.
   *                     example: one-mail@gmail.com
   *                    createdAt:
   *                     type: string
   *                     description: The Recipient's created hour in iso format.
   *                     example: 2022-12-06T00:53:42Z
   *                    updatedAt:
   *                     type: string
   *                     description: The Recipient's updated hour in iso format.
   *                     example: 2022-12-06T00:53:42Z
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
      const recipients = await RecipientService.showAll(newsletterId);
      res.json({ recipients });
    } catch (error) {
      console.error("[Error] index recipient", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
