const { Router } = require("express");

const User = require("../models/User");
const userController = require('../controllers/userController');
const { authenticated } = require("../middlewares/auth");

const router = new Router();

//* Index Page
router.get("/", userController.index);

//* Register Page
router.get("/register", userController.register);

//* Register Handle
router.post("/register", userController.createUser)

//* Login Page
router.get("/login", userController.login);

//* Login Handle
router.post("/login", userController.handleLogin, userController.rememberMe)

//* Logout Handle
router.get("/logout", authenticated,userController.logout)

//* Products Page
router.get("/products", userController.products);

//* Cart
router.get("/cart" , userController.cart)

//* 404
router.use(userController.p404)


module.exports = router;




