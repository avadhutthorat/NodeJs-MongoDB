const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    title: "Sign Up",
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => {
  console.log(req.body);
  const { email, password, confirmpassword } = req.body;
  User.findOne({ email: email })
    .then(userInfo => {
      if (userInfo) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};
exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    title: "Log In",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5e08644eb95cd76a64cc2ced")
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch(err => console.log(err));
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/login");
  });
};
