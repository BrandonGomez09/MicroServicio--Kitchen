const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KitchenModel = sequelize.define(
  'Kitchen', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_phone: {
      type: DataTypes.STRING,
    },
    contact_email: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    registration_date: {
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
    },
    approval_status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    approved_by: {
      type: DataTypes.INTEGER,
    },
    approval_date: {
      type: DataTypes.DATE,
    },
    rejection_reason: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'kitchens', 
    timestamps: false, 
  }
);

module.exports = KitchenModel;