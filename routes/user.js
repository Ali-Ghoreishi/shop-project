const { Router } = require("express");

const User = require("../models/User");
const userController = require('../controllers/userController');

const router = new Router();

//* Index Page
router.get("/", userController.index);

//* Register Page
router.get("/register", userController.register);

//* Register Handle
router.post("/register", userController.createUser)

//* Login Page
router.get("/login", userController.login);

//* Products Page
router.get("/products", userController.products);

//* 404
router.use(userController.p404)


module.exports = router;




