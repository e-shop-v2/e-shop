const Rating = require("../models/stars.js");

module.exports = {
  submitRating: async (req, res) => {
    const { itemId, rating } = req.body;
    try {
      await Rating.create({ itemId, rating });
      res.status(201).send("Rating submitted successfully");
    } catch (error) {
      res.status(500).send("Server error");
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
