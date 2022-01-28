const { Router } = require("express");
const { index, test, estilos } = require("../controllers/main.controller");
const loginRequired = require("../middleware/loginRequired.middleware");

const router = Router();

router.get("/", index);

router.get("/test", test);

router.get("/estilos", estilos);

router.get("/admin", loginRequired, (req, res) => {
  res.json({
    message: "Admin page",
  });
});

module.exports = router;
