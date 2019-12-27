const Mongodb = require("mongodb");

const getDb = require("../utils/database").getDb;
class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new Mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then(res => console.log(`data added succesfully --- ${res}`))
      .catch(err => console.log(`Error adding data ${err}`));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(res => res)
      .catch(err => console.log(`Unable to fetch products - ${err}`));
  }

  static fetchById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new Mongodb.ObjectId(prodId) })
      .next()
      .then(res => res)
      .catch(err => console.log(err));
  }
}

module.exports = Product;
