const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Templates.create);
router.delete("/", Controllers.Templates.destroy);
router.get("/:id", Controllers.Templates.show);
router.get("/", Controllers.Templates.showAll);
router.patch("/", Controllers.Templates.update);

module.exports = router;
