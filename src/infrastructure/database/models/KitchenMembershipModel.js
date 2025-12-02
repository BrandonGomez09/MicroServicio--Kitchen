const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KitchenMembership = sequelize.define(
  'KitchenMembership',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    
    kitchenId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },

    joinDate: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW
    },

    isActive: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true
    }
  },
  {
    tableName: 'kitchen_memberships',
    timestamps: false
  }
);

module.exports = KitchenMembership;