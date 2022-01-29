const { Router } = require("express");
const loginRequired = require("../middleware/loginRequired.middleware");
const {
  category,
  postCategory,
  getAllCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const {
  middlewareUploadMulter,
} = require("../middleware/middlewareUploadMulter");

const router = Router();

router.get("/category", category);

router.delete("/category/:id", deleteCategory);

router.get("/getCategory", getAllCategory);

router.post("/category", middlewareUploadMulter, postCategory);

module.exports = router;
