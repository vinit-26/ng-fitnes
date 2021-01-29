const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.createUser);

router.post("/login", authController.login);

module.exports = router;
