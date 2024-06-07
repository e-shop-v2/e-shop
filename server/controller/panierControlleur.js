const db = require("../database/index.js");
console.log(db.Panier, db.Product);
module.exports = {
  getUserCart: (req, res) => {
    (async (userId) => {
      try {
        const user = await db.Buyer.findAll({
          include: db.Product,
          where: { id: userId },
        });
        res.json(user);
      } catch (err) {
        res.json(err);
        console.log(err);
      }
    })(req.params.userId);
  },

  addToPanier: (req, res) => {
    db.Panier.create({
      ProductId: req.body.ProductId,
      BuyerId: req.body.BuyerId,
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => console.error(err));
  },
  remove: (req, res) => {
    db.Panier.destroy({ where: { productId: req.params.productId } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => console.error(err));
  },
};
