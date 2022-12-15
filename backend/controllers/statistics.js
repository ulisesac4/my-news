const StatisticService = require("../services/statistics");
module.exports = {
  /**
   * @openapi
   * /statistics:
   *  get:
   *     tags:
   *     - Template
   *     description: Show the statistics of the platform
   *
   *     responses:
   *       200:
   *         description: API has shown succesfully the details of the Template
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
   *                    content:
   *                     type: string
   *                     description: The Template's html content.
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
  show: async (req, res) => {
    try {
      const data = await StatisticService.show();
      res.json({ data });
    } catch (error) {
      console.error("[Error] show statistic", error);
      res.status(400);
      res.send(error.message);
    }
  },
};
