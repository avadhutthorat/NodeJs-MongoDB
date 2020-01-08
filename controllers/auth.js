const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    title: "log in",
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
