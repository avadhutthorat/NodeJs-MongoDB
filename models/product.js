const getDb = require("../utils/database").getDb;
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
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
}

module.exports = Product;
