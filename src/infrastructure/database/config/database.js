// Carga las variables de entorno del archivo .env
require('dotenv').config(); 

const { Sequelize } = require('sequelize');

// Creamos una instancia de Sequelize con la configuración de nuestra BD
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario
  process.env.DB_PASSWORD,  // Contraseña
  {
    host: process.env.DB_HOST, // Host (ej. 'localhost')
    port: process.env.DB_PORT, // Puerto (ej. 5432)
    dialect: 'postgres',      // Le decimos que usaremos PostgreSQL
    logging: false,           // Opcional: deshabilita los logs de SQL en la consola
  }
);

// Exportamos la instancia para usarla en otros archivos
module.exports = sequelize;