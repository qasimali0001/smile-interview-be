module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["Male", "Female", "Others"],
      },
    },
    {
      tableName: "Customer",
      freezeTableName: true,
    }
  );
  Customer.associate = function (models) {
    Customer.hasMany(models.Address, { as: "addresses" });
  };

  return Customer;
};
