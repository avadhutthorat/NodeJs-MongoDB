const Product = require("../models/product");

// list products on product tab
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
// exports.getProductDetails = (req, res, next) => {
//   let { productId } = req.params;

// Product.findAll({ where: { id: productId } })
//   .then(product => {
//     res.render("shop/product-detail", {
//       product: product[0],
//       path: "/products",
//       title: product.title
//     });
//   })
//   .catch(err => console.log(err));
// alternate way to fetch single record
//   Product.findByPk(productId)
//     .then(product => {
//       res.render("shop/product-detail", {
//         product: product,
//         path: "/products",
//         title: product.title
//       });
//     })
//     .catch(err => console.log(`failed to load the product detail - ${err}`));
// };

//list products on homepage
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/index", {
        products: products,
        title: "Shop",
        path: "/index"
      });
    })
    .catch(err => console.log(`Unable to fetch data from database - ${err}`));
};

// get products added to cart
// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then(cart => {
//       if (cart) {
//         return cart.getProducts();
//       } else {
//         return [];
//       }
//     })
//     .then(product => {
//       res.render("shop/cart", {
//         title: "My Cart",
//         path: "/cart",
//         cart: product,
//         totalPrice: "333" // change the price
//       });
//     })
//     .catch(err => console.log(err));
// };

// Adding product to cart
// exports.postCart = (req, res, next) => {
//   let { productId } = req.body;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then(products => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }

//       if (product) {
//         newQuantity = product.cartItem.quantity + 1;
//         return product;
//       }
//       return Product.findByPk(productId);
//     })
//     .then(product => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity }
//       });
//     })
//     .then(() => res.redirect("/cart"))
//     .catch(err => console.log(err));
// };

// // Deleting product from cart
// exports.deleteProductFromCart = (req, res, next) => {
//   let { deleteId } = req.body;
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart.getProducts({ where: { id: deleteId } });
//     })
//     .then(products => {
//       return products[0].cartItem.destroy();
//     })
//     .then(() => res.redirect("/cart"))
//     .catch(err => console.log(err));
// };

// // get all orders to show on page
// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then(orders => {
//       console.log(orders);
//       res.render("shop/orders", {
//         title: "My Orders",
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };

// // Create order outof cartItems
// exports.postCreateOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(err => console.log(err));
//     })
//     .then(() => fetchedCart.setProducts(null))
//     .then(() => res.redirect("/orders"))
//     .catch(err => console.log(`error while create order - ${err}`));
// };

// // checkout router
// exports.checkout = (req, res, next) => {
//   res.render("shop/checkout", { title: "Checkout" });
// };
