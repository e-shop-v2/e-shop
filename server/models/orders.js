
module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define("orders", {

    customer: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    product: { type: DataTypes.STRING, allowNull: false },
    });
    return orders;
  };
  