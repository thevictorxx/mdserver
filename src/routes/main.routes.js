const { Router } = require("express");
const { index, test } = require("../controllers/main.controller");

const router = Router();

router.get("/", index);

router.get("/test", test);

module.exports = router;
