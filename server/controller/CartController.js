const db = require("../database/index");

module.exports = {
  buy: function (req, res) {
    db.cart
      .create(req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  getOrders: function (req, res) {
    db.cart
      .findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  deleteOrder: function (req, res) {
    var orderID = req.params.id;
    db.cart
      .destroy({
        where: { id: orderID },
      })
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
};
