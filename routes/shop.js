const express = require("express");
const path = require("path");

const router = express.Router();
const shopController = require("../controllers/shop");
const autheticateUser = require("../middleware/isAuth");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductDetails);

router.get("/cart", autheticateUser, shopController.getCart);

router.post("/cart", autheticateUser, shopController.postCart);

router.get("/orders", autheticateUser, shopController.getOrders);

router.post("/create-order", autheticateUser, shopController.postCreateOrder);

router.post(
  "/delete-item-cart",
  autheticateUser,
  shopController.deleteProductFromCart
);

// router.get("/checkout", shopController.checkout);

module.exports = router;
