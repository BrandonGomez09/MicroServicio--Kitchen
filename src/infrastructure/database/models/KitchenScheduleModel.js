const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const KitchenSchedule = sequelize.define(
  "KitchenSchedule",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    kitchenId: { type: DataTypes.INTEGER, allowNull: false },

    day: {
      type: DataTypes.ENUM(
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY"
      ),
      allowNull: false
    },

    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  {
    tableName: "kitchenSchedules",
    timestamps: false
  }
);

module.exports = KitchenSchedule;