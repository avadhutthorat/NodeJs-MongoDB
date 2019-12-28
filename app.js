const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoConnect = require("./utils/database").mongoConnect;

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
  User.findUserById("5e06f69769459979f428c9a8")
    .then(user => {
      req.user = user;
      console.log(`User - ${user.name}`);
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404Page);

mongoConnect(() => {
  app.listen(3000);
});
