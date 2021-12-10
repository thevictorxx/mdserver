const { Router } = require("express");
const {
  index,
  test,
  add,
  edit,
  addPost,
} = require("../controllers/main.controller");

const router = Router();

router.get("/", test);

router.get("/test", test);

router.get("/edit/:pathFile", edit);

router.get("/add", add);

router.post("/add", addPost);

module.exports = router;
