const express = require('express');
const {editProfile, getallSeller} = require('../controller/SellerProfileController.js');
const router = express.Router();
router.get('/profile/show', getallSeller)
router.put('/profile/update',editProfile)


module.exports = router;
