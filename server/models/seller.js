module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define("Seller", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
   },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("buyer", "seller", "admin"),
      allowNull: false,
      defaultValue: "seller",
    },  
  });

  return Seller;
};
