
const db = require("../database/index.js");
module.exports = {

getAllOrders: function (req, res) {
    db.orders
      .findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  addOrder: function (req, res) {
    const { customer, category, price, product } = req.body;
    db.orders
      .create({
        customer: customer,
        category: category,
        price: price,
        product: product
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

}