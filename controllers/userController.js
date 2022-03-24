const bcrypt = require("bcryptjs");
const passport = require("passport");

const Product = require("../models/product");
const User = require("../models/User");

// Index Page
exports.index = (req, res) => {
  res.render("index", {
    path: "/",
    pageTitle: "shop",
    logStatus: `${req.user ? "in" : "out"}`,                      //passportjs
    fullname: `${req.user ? req.user.fullname : ""}`,
  });
};

// Products Page
exports.products = (req, res) => {
  Product.find(function (err, docs) {
     res.render("products", {
      path: "/products",
      pageTitle: "shop",
      products: docs,
      logStatus: `${req.user ? "in" : "out"}`,
      fullname: `${req.user ? req.user.fullname : ""}`,
    });
  })
};

// exports.products = (req, res) => {
//   Product.find(function (err, docs) {
//     var productChunks = [];
//     var chunkSize = 3;
//     for (var i = 0; i < docs.length; i += chunkSize) {
//       productChunks.push(docs.slice(i, i + chunkSize));
//     }
//     res.render("products", {
//       path: "/products",
//       pageTitle: "shop",
//       products: productChunks,
//       logStatus: `${req.user ? "in" : "out"}`,
//       fullname: `${req.user ? req.user.fullname : ""}`,
//     });
//   });
// };



// Register Page
exports.register = (req, res) => {
  res.render("register", {
    path: "/register",
    pageTitle: "ثبت نام کاربر",
  });
};

// Login Page
exports.login = (req, res) => {
  res.render("login", {
    path: "/login",
    pageTitle: "ورود به حساب کاربری",
    message: req.flash("success_msg"),
    error: req.flash("error"),
  });
};

// handle Login
exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

// Remember Me
exports.rememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day
  } else {
    req.session.cookie.expire = null;
  }
  res.redirect("/");
};

// Logout
exports.logout = (req, res) => {
  req.logout(); //passportjs         destroy session
  req.flash("success_msg", "خروج موفقیت امیز بود");
  res.redirect("/login");
};

// Create User
exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      errors.push({ message: "کاربری با این ایمیل موجود است" });
      return res.render("register", {
        path: "/register",
        pageTitle: "ثبت نام کاربر",
        errors,
      });
    }

    // Password hashing
    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullname, email, password: hash });
    req.flash("success_msg", "ثبت نام موفقیت امیز بود.");
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
    return res.render("register", {
      path: "/register",
      pageTitle: "ثبت نام کاربر",
      errors,
    });
  }
};

// Cart
exports.cart = (req, res) => {
  res.render("cart", {
    path: "/cart",
    pageTitle: "سبد خرید",
    logStatus: `${req.user ? "in" : "out"}`,
    fullname: `${req.user ? req.user.fullname : ""}`,
  });
};

// add-to-cart
exports.addToCart = function (req, res, next) {
  var productId = req.params.id;
};

// 404 Page
exports.p404 = (req, res) => {
  res.render("404", {
    path: "/404",
    pageTitle: "Page Not Found",
  });
};
