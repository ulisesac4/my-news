const express = require("express");

const router = express.Router();

router.use("/issues", require("./issues"));
router.use("/newsletters", require("./newsletters"));
router.use("/recipients", require("./recipients"));
router.use("/templates", require("./template"));
router.use("/statistics", require("./statistics"));

module.exports = router;
