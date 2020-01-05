const Product = require("../models/product");
const Order = require("../models/order");

//list products on homepage
exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render("shop/index", {
        products: products,
        title: "Shop",
        path: "/index",
        isAuthenticated: req.isLoggedIn
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
        path: "/products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(`Unable to fetch data from database - ${err}`));
};

// get product details
exports.getProductDetails = (req, res, next) => {
  let { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        path: "/products",
        title: product.title,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

// get products added to cart
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        title: "My Cart",
        path: "/cart",
        cart: products,
        totalPrice: "333",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

// Adding product to cart
exports.postCart = (req, res, next) => {
  let { productId } = req.body;
  Product.findById(productId)
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
    .removeFromCart(deleteId)
    .then(() => res.redirect("/cart"))
    .catch(err => console.log(err));
};

// get all orders to show on page
exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      console.log(orders);
      res.render("shop/orders", {
        title: "My Orders",
        orders: orders,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

// Create order outof cartItems
exports.postCreateOrder = (req, res, next) => {
  let items = [];
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      let product;
      user.cart.items.map(prd => {
        product = {
          product: { ...prd.productId._doc },
          quantity: prd.quantity
        };
        return items.push(product);
      });
    })
    .then(prodArray => {
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: [...items]
      });

      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => res.redirect("/orders"))
    .catch(err => console.log(`error while create order - ${err}`));
};

// // checkout router
// exports.checkout = (req, res, next) => {
//   res.render("shop/checkout", { title: "Checkout" });
// };
