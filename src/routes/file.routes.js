const { Router } = require("express");

const {
  add,
  edit,
  addPost,
  editPost,
} = require("../controllers/file.controller");

const router = Router();

router.get("/edit/:pathFile", edit);

router.post("/edit/:pathFile", editPost);

router.get("/add", add);

router.post("/add", addPost);

module.exports = router;
