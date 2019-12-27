const MongoDB = require("mongodb");

const MongoClient = MongoDB.MongoClient;

let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://avadhut:fMyI2X3KLZVx43IR@cluster0-wnwz9.mongodb.net/shop?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
    .then(client => {
      _db = client.db();
      callback();
      console.log("connected");
    })
    .catch(err => console.log(`Error connecting database - ${err}`));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
