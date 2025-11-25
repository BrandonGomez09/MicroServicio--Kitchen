const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KitchenScheduleModel = sequelize.define(
  'KitchenSchedule',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    kitchen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    open_time_weekdays: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close_time_weekdays: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    open_time_weekends: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close_time_weekends: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  { tableName: 'kitchen_schedules', timestamps: false }
);

module.exports = KitchenScheduleModel;
