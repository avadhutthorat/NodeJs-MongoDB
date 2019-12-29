const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const rootDir = require("./utils/path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "pug"); // configuring pug for express
app.set("views", "views"); // will look for view in views folder

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  // User.findUserById("5e06f69769459979f428c9a8")
  //   .then(user => {
  //     req.user = new User(user.name, user.email, user.cart, user._id);
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next();
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404Page);

mongoose
  .connect(
    "mongodb+srv://avadhut:fMyI2X3KLZVx43IR@cluster0-wnwz9.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    console.log("connected");
    console.log(result);
    app.listen(3000);
  })
  .catch(() => console.log(`Not connected to database`));
