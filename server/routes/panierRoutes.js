const routerPa = require("express").Router();
const {
  getUserCart,
  addToPanier,
  remove,
} = require("../controller/panierControlleur.js");

routerPa.get("/usercart/:userId", getUserCart);
routerPa.post("/usercart", addToPanier);
routerPa.delete("/del/:productId", remove);

module.exports = routerPa;
