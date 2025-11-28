const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KitchenResponsible = sequelize.define(
  'KitchenResponsible',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    kitchenId: { type: DataTypes.INTEGER, allowNull: false },

    names: { type: DataTypes.STRING, allowNull: false },
    firstLastName: { type: DataTypes.STRING, allowNull: false },
    secondLastName: { type: DataTypes.STRING, allowNull: true },

    email: { type: DataTypes.STRING, allowNull: false },

    phoneNumber: { type: DataTypes.STRING, allowNull: false },

    password: { type: DataTypes.STRING, allowNull: false },

    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: 'kitchenResponsibles',
    timestamps: false
  }
);

module.exports = KitchenResponsible;