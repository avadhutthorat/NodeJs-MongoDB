const Mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  createUser() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(res => res)
      .catch(() => console.log("User cant be created"));
  }

  addToCart(product) {
    const db = getDb();
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
        productId: new Mongodb.ObjectId(product._id),
        quantity: 1
      });
    }
    let updatedCart = {
      items: updatedCartItems
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new Mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
      .then(res => {
        console.log(`in addtocart model - ${res}`);
        return res;
      })
      .catch(err => console.log(err));
  }

  static findUserById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new Mongodb.ObjectId(userId) }) // .find().next()
      .then(result => {
        console.log("user found");
        return result;
      })
      .catch(() => console.log("User not found"));
  }
}

module.exports = User;
