const Rating = require("../models/stars.js");

module.exports = {
  addRating: async (req, res) => {
    try {
      const itemIds = req.params.itemIds;
      const newRate = req.body.rating;

      const product = await db.Product.findByPk(itemIds);

      if (!product) {
        return res.status(404).send("Product not found");
      }
      const currRating = product.rating;
      const currNumOfRates = product.numOfRating;

      const updatedNumOfRatings = currNumOfRates + 1;

      await product.update({
        rating: newRate,
        numOfRating: updatedNumOfRatings,
      });

      res.status(200).json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error);
    }
  },

  getAverageRating: async (req, res) => {
    const { itemId } = req.params;
    try {
      const ratings = await Rating.findAll({ where: { itemId } });
      const averageRating =
        ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
      res.json({ itemId, averageRating });
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
};
