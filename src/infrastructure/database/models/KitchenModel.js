const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importamos nuestra conexión

// Definimos el modelo que corresponde a la tabla "kitchens"
const KitchenModel = sequelize.define(
  'Kitchen', // Nombre del modelo (Sequelize usará "Kitchens" como nombre de tabla)
  {
    // --- Columnas ---
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, // varchar
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Aquí Sequelize asume una FK.
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Aquí Sequelize asume una FK.
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
      type: DataTypes.DATE, // timestamp
      defaultValue: DataTypes.NOW, // Se pone la fecha actual al crear
    },
    approval_status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    approved_by: {
      type: DataTypes.INTEGER,
      // Aquí Sequelize asume una FK.
    },
    approval_date: {
      type: DataTypes.DATE, // timestamp
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
    // --- Opciones ---
    tableName: 'kitchens', // Le decimos a Sequelize el nombre exacto de la tabla
    timestamps: false, // Deshabilitamos 'createdAt' y 'updatedAt'
  }
);

module.exports = KitchenModel;