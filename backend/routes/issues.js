const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Issues.create);
router.delete("/", Controllers.Issues.destroy);
router.get("/:id", Controllers.Issues.show);
router.get("/:newsletterId", Controllers.Issues.showAll);
router.patch("/", Controllers.Issues.update);

module.exports = router;
