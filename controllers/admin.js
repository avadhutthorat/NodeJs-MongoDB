const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    title: "Add Products",
    path: "/admin/add-product"
  });
};

// get values for editing of product
exports.editProduct = (req, res, next) => {
  let { productId } = req.params;
  // Product.findByPk(productId) // alternate way
  req.user
    .getProducts({ where: { id: productId } }) // get product for editing for logged in user
    .then(product => {
      res.render("admin/edit-product", {
        title: "Edit Product",
        path: "/admin/products",
        product: product[0]
      });
    })
    .catch(err => res.redirect("/"));
};

// Add product
exports.postAddProduct = (req, res, next) => {
  let { title, imageUrl, price, description } = req.body;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(() => res.redirect("/admin/products"))
    .catch(err => console.log(`Error while post data to database - ${err}`));
  // Alternate way
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id
  // })
  //   .then(() => res.redirect("/admin/products"))
  //   .catch(err => console.log(`Error while post data to database - ${err}`));
};

// save edited product
exports.postEditProduct = (req, res, next) => {
  console.log(req.body);
  let { title, imageUrl, price, description, productId } = req.body;
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(response => res.redirect("/admin/products"))
    .catch(err => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts()
    .then(products => {
      res.render("admin/products", {
        products: products,
        title: "Admin Product",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

// delete product
exports.deleteProduct = (req, res, next) => {
  let { productId } = req.params;
  Product.destroy({
    where: {
      id: productId
    }
  })
    .then(() => res.redirect("/admin/products"))
    .catch(err => console.log(`error while deleting ${err}`));
};
