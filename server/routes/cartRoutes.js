const express = require('express');
const { buy, getOrders, deleteOrder } = require('../controller/CartController.js');
const router = express.Router();

router.post('/add', buy);
router.get('/orders', getOrders);
router.delete('/orders/:id', deleteOrder); 

module.exports = router;
