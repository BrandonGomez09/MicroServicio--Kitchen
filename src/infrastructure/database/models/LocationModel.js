const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define(
  'Location',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    street_address: { type: DataTypes.STRING, allowNull: false },
    neighborhood: { type: DataTypes.STRING, allowNull: false },
    state_id: { type: DataTypes.INTEGER, allowNull: false },
    municipality_id: { type: DataTypes.INTEGER, allowNull: false },
    postal_code: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  {
    tableName: 'locations',
    timestamps: false,
  }
);


module.exports = Location;
