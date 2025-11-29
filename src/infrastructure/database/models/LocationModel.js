const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define(
  'Location',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: { type: DataTypes.STRING, allowNull: false },

    streetAddress: { type: DataTypes.STRING, allowNull: false },
    neighborhood: { type: DataTypes.STRING, allowNull: false },

    stateId: { type: DataTypes.INTEGER, allowNull: false },
    municipalityId: { type: DataTypes.INTEGER, allowNull: false },

    postalCode: { type: DataTypes.STRING, allowNull: false },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  {
    tableName: 'locations',
    timestamps: false
  }
);

module.exports = Location;