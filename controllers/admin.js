const Mongodb = require("mongodb");

const Product = require("../models/product");

exports.getListofProducts = (req, res, next) => {
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
  Product.fetchById(productId)
    .then(product => {
      res.render("admin/edit-product", {
        title: "Edit Product",
        path: "/admin/products",
        product: product
      });
    })
    .catch(() => res.redirect("/"));
};

// Add product
exports.postAddProduct = (req, res, next) => {
  let { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(() => res.redirect("/admin/products"))
    .catch(err => console.log(`Error while post data to database - ${err}`));
};

// save edited product
exports.postEditProduct = (req, res, next) => {
  let { title, imageUrl, price, description, productId } = req.body;
  const product = new Product(
    title,
    imageUrl,
    price,
    description,
    new Mongodb.ObjectId(productId)
  );
  product
    .save()
    .then(result => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));

  // Product.findByPk(productId)
  //   .then(product => {
  //     product.title = title;
  //     product.imageUrl = imageUrl;
  //     product.price = price;
  //     product.description = description;
  //     return product.save();
  //   })
  //   .then(response => res.redirect("/admin/products"))
  //   .catch(err => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("admin/products", {
        products: products,
        title: "Admin Product",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

// // delete product
// exports.deleteProduct = (req, res, next) => {
//   let { productId } = req.params;
//   Product.destroy({
//     where: {
//       id: productId
//     }
//   })
//     .then(() => res.redirect("/admin/products"))
//     .catch(err => console.log(`error while deleting ${err}`));
// };
