const routerWish = require("express").Router();
const {
  getWishList,
  addToWishList,
  remove,
} = require("../controller/wishlistControlleur.js");
routerWish.get("/userWishList/:userId", getWishList);
routerWish.post("/userWishList", addToWishList);
routerWish.delete("/userWishList/:productId", remove);
module.exports = routerWish;
