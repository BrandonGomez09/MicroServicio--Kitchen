const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Kitchen = require('./KitchenModel');

const KitchenResponsible = sequelize.define(
  'KitchenResponsible',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    kitchen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'kitchens', key: 'id' }
    },

    names: { type: DataTypes.STRING, allowNull: false },
    first_last_name: { type: DataTypes.STRING, allowNull: false },
    second_last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },

    password_hash: { type: DataTypes.STRING, allowNull: false },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: 'kitchen_responsibles',
    timestamps: false,
  }
);

Kitchen.hasOne(KitchenResponsible, {
  foreignKey: 'kitchen_id',
  as: 'responsible'
});

KitchenResponsible.belongsTo(Kitchen, {
  foreignKey: 'kitchen_id',
  as: 'kitchen'
});


module.exports = KitchenResponsible;