require('dotenv').config(); // Cargar .env al inicio
const app = require('./app');
const sequelize = require('./infrastructure/database/config/database');
const KitchenModel = require('./infrastructure/database/models/KitchenModel');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Probar la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos (PostgreSQL) establecida.');

    // 2. Sincronizar modelos (Crea la tabla 'kitchens' si no existe)
    // 'force: false' evita que borre la tabla cada vez.
    // 'alter: true' puede ser útil en desarrollo para aplicar cambios.
    await sequelize.sync({ alter: true }); 
    console.log('Modelo [Kitchen] sincronizado con la base de datos.');

    // 3. Iniciar el servidor de Express
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`API disponible en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); // Salir del proceso con error
  }
}

// ¡Arrancar!
startServer();