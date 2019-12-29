const express = require("express");
const path = require("path");

const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductDetails);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);

router.post("/create-order", shopController.postCreateOrder);

router.post("/delete-item-cart", shopController.deleteProductFromCart);

// router.get("/checkout", shopController.checkout);

module.exports = router;
