const routerOrders = require("express").Router();
const {
  getAllOrders,
  addOrder
  
} = require("../controller/ordersController.js");

routerOrders.get("/", getAllOrders);
routerOrders.post("/", addOrder);



module.exports = routerOrders;