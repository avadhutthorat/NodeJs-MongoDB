const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const rootDir = require("./utils/path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "pug"); // configuring pug for express
app.set("views", "views"); // will look for view in views folder

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "My secret key should be long",
    resave: false,
    saveUninitialized: false
  })
);
app.use((req, res, next) => {
  User.findById("5e08644eb95cd76a64cc2ced")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use(authRouter);
app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404Page);

mongoose
  .connect(
    "mongodb+srv://avadhut:fMyI2X3KLZVx43IR@cluster0-wnwz9.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(result => {
    User.findOne().then(foundUser => {
      if (!foundUser) {
        const user = new User({
          name: "Avadhut",
          email: "avadhut@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch(() => console.log(`Not connected to database`));
