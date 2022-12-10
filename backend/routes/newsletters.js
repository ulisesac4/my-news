const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Newsletters.create);
router.delete("/", Controllers.Newsletters.destroy);
router.get("/", Controllers.Newsletters.showAll);
router.patch("/", Controllers.Newsletters.update);

module.exports = router;
