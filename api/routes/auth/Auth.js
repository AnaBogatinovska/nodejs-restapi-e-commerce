const express = require("express");
const router = express.Router();

const authController = require('../../controllers/auth')

router.get('/users', authController.get_users)

router.post("/register", authController.register);

router.post("/login", authController.login);


module.exports = router;
