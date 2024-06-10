const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("eshop", "root", "walkitlikeitalkit", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Admin = require("../models/admin.js")(sequelize, DataTypes);
db.Buyer = require("../models/buyer.js")(sequelize, DataTypes);
db.Seller = require("../models/seller.js")(sequelize, DataTypes);
db.Product = require("../models/product.js")(sequelize, DataTypes);
db.cart = require("../models/cart.js")(sequelize, DataTypes);
db.Panier = require("../models/panierModel")(sequelize, DataTypes);
db.WishList = require("../models/wishListModel")(sequelize, DataTypes);
db.Buyer.belongsToMany(db.Product, { through: db.Panier });
db.Product.belongsToMany(db.Buyer, { through: db.Panier });
// db.Buyer.belongsToMany(db.Product, { through: db.WishList });
// db.Product.belongsToMany(db.Buyer, { through: db.WishList });
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Tables created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create tables:", error);
//   });

module.exports = db;
