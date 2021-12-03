const { Router } = require("express");
const { index, test, add, edit } = require("../controllers/main.controller");

const router = Router();

router.get("/", test);

router.get("/test", test);

router.get("/edit/:path", edit);

router.get("/add", add);

module.exports = router;
