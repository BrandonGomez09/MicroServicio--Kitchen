require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,      
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    // --- CAMBIO AQUÍ: Quitamos o condicionamos el SSL ---
    // Si estás en local, no necesitas dialectOptions con SSL.
    // Solo se usa si te conectas a una BD en la nube que lo exija (como Render o Neon).
    /*
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
    */
  }
);

module.exports = sequelize;