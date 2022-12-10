const express = require("express");

const router = express.Router();

router.use("/issues", require("./issues"));
router.use("/newsletters", require("./newsletters"));

module.exports = router;
