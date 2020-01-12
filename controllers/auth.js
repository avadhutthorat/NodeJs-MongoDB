const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

// sgMail.setApiKey(
//   "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"
// );

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);

exports.getSignup = (req, res, next) => {
  const message = req.flash("error")[0];
  res.render("auth/signup", {
    path: "/signup",
    title: "Sign Up",
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  console.log(req.body);
  const { email, password, confirmpassword } = req.body;
  User.findOne({ email: email })
    .then(userInfo => {
      if (userInfo) {
        req.flash("error", "Email already exists!");
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
          // const msg = {
          //   to: email,
          //   from: "shop@avadhutthorat.io",
          //   subject: "Welcome to avadhutthorat.io",
          //   text: "Successfully signed up!",
          //   html: "<strong>Jai Shri Ram</strong>"
          // };
          // sgMail.send(msg);
          return transporter.sendMail({
            to: email,
            from: "shop@node-complete.com",
            subject: "Signup succeeded!",
            html: "<h1>You successfully signed up!</h1>"
          });
        })
        .then(err => console.log(err));
    })
    .catch(err => console.log(err));
};
exports.getLogin = (req, res, next) => {
  const message = req.flash("error")[0];
  res.render("auth/login", {
    path: "/login",
    title: "Log In",
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Incorrect email or password");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          req.session.user = user;
          req.session.isLoggedIn = true;
          return req.session.save(err => {
            res.redirect("/");
          });
        }
        res.redirect("/login");
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

exports.passwordReset = (req, res, next) => {
  const message = req.flash("error")[0];
  res.render("auth/reset", {
    path: "/reset",
    title: "Reset Password",
    errorMessage: message
  });
};
