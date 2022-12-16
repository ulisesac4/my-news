const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Recipients.create);
router.delete("/", Controllers.Recipients.destroy);
router.get("/:newsletterId", Controllers.Recipients.showAll);
router.get("/subscriptions/:email", Controllers.Recipients.mySubscriptions);

module.exports = router;
