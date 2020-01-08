exports.get404Page = (req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404.pug", {
    title: "Page Not Found",
    isAuthenticated: req.session.isLoggedIn
  });
};
