const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Issues.create);

module.exports = router;
