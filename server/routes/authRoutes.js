const express = require("express");
const {
  registerSeller,
  registerBuyer,
  login,
  
} = require("../controller/authController");
const router = express.Router();

router.post("/register/seller", registerSeller);
router.post("/register/buyer", registerBuyer);
router.post("/login", login);


module.exports = router;
