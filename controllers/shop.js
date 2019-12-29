const Product = require("../models/product");

//list products on homepage
exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render("shop/index", {
        products: products,
        title: "Shop",
        path: "/index"
      });
    })
    .catch(err => console.log(`Unable to fetch data from database - ${err}`));
};

// list products on product tab
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        products: products,
        title: "Products",
        path: "/products"
      });
    })
    .catch(err => console.log(`Unable to fetch data from database - ${err}`));
};

// get product details
exports.getProductDetails = (req, res, next) => {
  let { productId } = req.params;
  Product.fetchById(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        path: "/products",
        title: product.title
      });
    })
    .catch(err => console.log(err));
};

// get products added to cart
exports.getCart = (req, res, next) => {
  req.user
    .getCartItems()
    .then(products => {
      console.log("in cart");
      res.render("shop/cart", {
        title: "My Cart",
        path: "/cart",
        cart: products,
        totalPrice: "333" // change the price
      });
    })
    .catch(err => console.log(err));
};

// Adding product to cart
exports.postCart = (req, res, next) => {
  let { productId } = req.body;
  Product.fetchById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => res.redirect("/cart"))
    .catch();
};

// Deleting product from cart
exports.deleteProductFromCart = (req, res, next) => {
  let { deleteId } = req.body;
  req.user
    .deleteItemFromCart(deleteId)
    .then(() => res.redirect("/cart"))
    .catch(err => console.log(err));
};

// get all orders to show on page
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render("shop/orders", {
        title: "My Orders",
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

// Create order outof cartItems
exports.postCreateOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .orderCartItems()
    .then(() => res.redirect("/orders"))
    .catch(err => console.log(`error while create order - ${err}`));
};

// // checkout router
// exports.checkout = (req, res, next) => {
//   res.render("shop/checkout", { title: "Checkout" });
// };
