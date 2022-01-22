const { Router } = require("express");
const {
  index,
  test,
  add,
  edit,
  addPost,
  editPost,
} = require("../controllers/main.controller");

const router = Router();

router.get("/", test);

router.get("/test", index);

router.get("/edit/:pathFile", edit);

router.post("/edit/:pathFile", editPost);

router.get("/add", add);

router.post("/add", addPost);

module.exports = router;
