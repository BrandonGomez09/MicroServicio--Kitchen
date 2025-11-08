require('dotenv').config();
const app = require('./app');
const sequelize = require('./infrastructure/database/config/database');
const KitchenModel = require('./infrastructure/database/models/KitchenModel');
const LocationModel = require('./infrastructure/database/models/LocationModel');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos (PostgreSQL) establecida.');

    await sequelize.sync({ alter: true }); 
    console.log('Modelos [Kitchen, Location] sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`API disponible en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();