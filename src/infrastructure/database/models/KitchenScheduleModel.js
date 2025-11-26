const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KitchenSchedule = sequelize.define(
  'KitchenSchedule',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    kitchenId: { type: DataTypes.INTEGER, allowNull: false },

    openTimeWeekdays: { type: DataTypes.TIME, allowNull: false },
    closeTimeWeekdays: { type: DataTypes.TIME, allowNull: false },

    openTimeWeekends: { type: DataTypes.TIME, allowNull: false },
    closeTimeWeekends: { type: DataTypes.TIME, allowNull: false },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  {
    tableName: 'kitchenSchedules',
    timestamps: false
  }
);

module.exports = KitchenSchedule;
