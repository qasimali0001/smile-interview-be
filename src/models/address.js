module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Address",
      freezeTableName: true,
    }
  );
  Address.associate = function (models) {
    Address.belongsTo(models.Customer);
  };

  return Address;
};
