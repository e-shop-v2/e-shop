const express = require("express");
const {
  submitRating,
  getAverageRating,
} = require("../controller/starsControllers.js");

const routerStar = express.Router();

routerStar.post("/rate", submitRating);
routerStar.get("/rating/:itemId", getAverageRating);

module.exports = routerStar;
