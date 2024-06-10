const express = require("express");
const {
  addRating,
  getAverageRating,
} = require("../controller/starsControllers.js");

const routerStar = express.Router();

routerStar.post("/rate", addRating);
routerStar.get("/rating/:itemId", getAverageRating);

module.exports = routerStar;
