const { Router } = require("express");
const loginRequired = require("../middleware/loginRequired.middleware");
const {
  category,
  postCategory,
} = require("../controllers/category.controller");
const {
  middlewareUploadMulter,
} = require("../middleware/middlewareUploadMulter");

const router = Router();

router.get("/category", category);

router.post("/category", middlewareUploadMulter, postCategory);

module.exports = router;
