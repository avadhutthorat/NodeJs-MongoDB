const express = require("express");
const path = require("path");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/products", adminController.getAdminProducts);

// /admin/admin-product =>  GET
router.get("/add-product", adminController.getListofProducts);

// /admin/product =>  POST
router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product", adminController.postEditProduct);

router.get("/edit-product/:productId", adminController.editProduct);

router.get("/delete-product/:productId", adminController.deleteProduct);

module.exports = router;
