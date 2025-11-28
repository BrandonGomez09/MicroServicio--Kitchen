const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Location = require('./LocationModel');
const KitchenResponsible = require('./KitchenResponsibleModel');
const KitchenSchedule = require('./KitchenScheduleModel');

const Kitchen = sequelize.define(
  'Kitchen',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },

    ownerId: { type: DataTypes.INTEGER, allowNull: false },

    locationId: { type: DataTypes.INTEGER, allowNull: false },

    contactPhone: { type: DataTypes.STRING, allowNull: false },
    contactEmail: { type: DataTypes.STRING, allowNull: false },

    imageUrl: { type: DataTypes.STRING, allowNull: true },

    registrationDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    approvalStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },

    approvedBy: { type: DataTypes.INTEGER, allowNull: true },
    approvalDate: { type: DataTypes.DATE, allowNull: true },
    rejectionReason: { type: DataTypes.TEXT, allowNull: true },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    tableName: 'kitchens',
    timestamps: false
  }
);

Kitchen.belongsTo(Location, {
  foreignKey: "locationId",
  as: "location"
});

Kitchen.hasOne(KitchenResponsible, {
  foreignKey: "kitchenId",
  as: "responsible"
});

KitchenResponsible.belongsTo(Kitchen, {
  foreignKey: "kitchenId",
  as: "kitchen"
});

Kitchen.hasMany(KitchenSchedule, {
  foreignKey: "kitchenId",
  as: "schedule"
});

KitchenSchedule.belongsTo(Kitchen, {
  foreignKey: "kitchenId",
  as: "kitchen"
});

module.exports = Kitchen;
