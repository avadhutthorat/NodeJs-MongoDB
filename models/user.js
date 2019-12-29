const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  // return and index of product if exists otherwise -1
  let productIndex = this.cart.items.findIndex(
    prod => prod.productId.toString() === product._id.toString()
  );
  let updatedCartItems = [...this.cart.items];
  // if product is already present in cart
  if (productIndex >= 0) {
    let quantity = this.cart.items[productIndex].quantity + 1;
    updatedCartItems[productIndex].quantity = quantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1
    });
  }
  let updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const Mongodb = require("mongodb");
// const getDb = require("../utils/database").getDb;

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   createUser() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then(res => res)
//       .catch(() => console.log("User cant be created"));
//   }

//   static findUserById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new Mongodb.ObjectId(userId) }) // .find().next()
//       .then(result => {
//         return result;
//       })
//       .catch(() => console.log("User not found"));
//   }

//   addToCart(product) {
//     const db = getDb();
//     // return and index of product if exists otherwise -1
//     let productIndex = this.cart.items.findIndex(
//       prod => prod.productId.toString() === product._id.toString()
//     );
//     let updatedCartItems = [...this.cart.items];
//     // if product is already present in cart
//     if (productIndex >= 0) {
//       let quantity = this.cart.items[productIndex].quantity + 1;
//       updatedCartItems[productIndex].quantity = quantity;
//     } else {
//       updatedCartItems.push({
//         productId: new Mongodb.ObjectId(product._id),
//         quantity: 1
//       });
//     }
//     let updatedCart = {
//       items: updatedCartItems
//     };
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new Mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       )
//       .then(res => {
//         return res;
//       })
//       .catch(err => console.log(err));
//   }

//   getCartItems() {
//     let db = getDb();
//     let productIds = this.cart.items.map(prd => prd.productId);
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(
//               cartProd => cartProd.productId.toString() === p._id.toString()
//             ).quantity
//           };
//         });
//       })
//       .catch();
//   }

//   deleteItemFromCart(prodId) {
//     let db = getDb();
//     let updatedCartItems = this.cart.items.filter(
//       i => i.productId.toString() !== prodId.toString()
//     );
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new Mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       )
//       .then(res => res)
//       .catch(err => console.log(err));
//   }

//   orderCartItems() {
//     let db = getDb();
//     return this.getCartItems()
//       .then(products => {
//         let orders = {
//           items: products,
//           user: {
//             _id: new Mongodb.ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection("orders").insertOne(orders);
//       })
//       .then(() => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new Mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();

//     return db
//       .collection("orders")
//       .find({ "user._id": new Mongodb.ObjectId(this._id) })
//       .toArray()
//       .then(res => res);
//   }
// }

// module.exports = User;
