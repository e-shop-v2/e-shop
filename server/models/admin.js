module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("buyer", "seller", "admin"),
      allowNull: false,
      defaultValue: "admin",
    },
  });

  return Admin;
};
