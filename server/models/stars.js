module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    numOfRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
  return Rating;
};
