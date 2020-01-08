const express = require("express");
const path = require("path");

const adminController = require("../controllers/admin");
const autheticateUser = require("../middleware/isAuth");

const router = express.Router();

router.get("/products", autheticateUser, adminController.getAdminProducts);

// /admin/admin-product =>  GET
router.get("/add-product", autheticateUser, adminController.getListofProducts);

// /admin/product =>  POST
router.post("/add-product", autheticateUser, adminController.postAddProduct);

router.post("/edit-product", autheticateUser, adminController.postEditProduct);

router.get(
  "/edit-product/:productId",
  autheticateUser,
  adminController.editProduct
);

router.get(
  "/delete-product/:productId",
  autheticateUser,
  adminController.deleteProduct
);

module.exports = router;
