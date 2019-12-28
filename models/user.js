const Mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  createUser() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(res => res)
      .catch(() => console.log("User cant be created"));
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
