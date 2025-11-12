const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocationModel = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  municipality_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'locations',
  timestamps: true
});

module.exports = LocationModel;