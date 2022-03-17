const bcrypt = require("bcryptjs");

const User = require("../models/User");

// Index Page
exports.index = (req, res) => {
  res.render("index", {
    path: "/",
    pageTitle: "shop",
  });
};

// Products Page
exports.products = (req, res) => {
  res.render("products", {
    path: "/products",
    pageTitle: "shop",
  });
};

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
  });
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
    const hash = await bcrypt.hash(password, 10)
    await User.create({fullname, email, password: hash})
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

// 404 Page
exports.p404 = (req, res) => {
  res.render("404", {
    path: "/404",
    pageTitle: "Page Not Found",
  });
};
