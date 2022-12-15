const StatisticService = require("../services/statistics");
module.exports = {
  /**
   * @openapi
   * /statistics:
   *   post:
   *     tags:
   *     - Statistic
   *     description: Create an Template
   *     responses:
   *       200:
   *         description: API has created succesfully the Template
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     sent:
   *                       type: object
   *                       properties:
   *                         name:
   *                           type: string
   *                         date:
   *                           type: string
   *                     amountSent:
   *                       type: integer
   *                       format: int32
   *                     unSent:
   *                       type: object
   *                       properties:
   *                         name:
   *                           type: string
   *                         date:
   *                           type: string
   *                     amountunSent:
   *                       type: integer
   *                       format: int32
   *                     weeks:
   *                       type: array
   *                       items:
   *                         type: string
   *                     entries:
   *                       type: array
   *                       items:
   *                         type: integer
   *                         format: int32
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
