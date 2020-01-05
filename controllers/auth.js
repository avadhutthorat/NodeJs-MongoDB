exports.getLogin = (req, res, next) => {
  console.log(
    req
      .get("Cookie")
      .trim()
      .split("=")[1]
  );
  res.render("auth/login", {
    path: "/login",
    title: "log in",
    isAuthenticated: req
      .get("Cookie")
      .trim()
      .split("=")[1]
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("set-cookie", "loggedIn=true");
  res.redirect("/");
};
