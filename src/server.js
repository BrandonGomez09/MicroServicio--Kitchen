require('dotenv').config();
const app = require('./app');
const sequelize = require('./infrastructure/database/config/database');
const publisher = require('./infrastructure/adapters/RabbitMQPublisher');
require('./infrastructure/database/models/LocationModel');
require('./infrastructure/database/models/KitchenModel');


const PORT = process.env.PORT;

async function startServer() {
  try {
    console.log('🚀 Iniciando Kitchen Service...');

    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos (PostgreSQL) establecida.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Tablas sincronizadas automáticamente con { alter: true }');
    } else {
      await sequelize.sync();
      console.log('✅ Tablas verificadas (sin alteraciones)');
    }

    await publisher.connect();
    console.log('🐇 RabbitMQ conectado correctamente (Publisher listo).');

    app.listen(PORT, () => {
      console.log(`🌐 Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
