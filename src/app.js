const express = require('express');
const kitchenRoutes = require('./infrastructure/api/routes/KitchenRoutes');

// Crear la aplicación de Express
const app = express();

// --- Middlewares ---
// 1. Para que Express entienda JSON en el body de las solicitudes
app.use(express.json());

// 2. (Opcional) Para que entienda datos de formularios web
app.use(express.urlencoded({ extended: true }));

// --- Rutas ---
// Le decimos a Express que use nuestras rutas
// Todas las rutas en kitchenRoutes ahora empezarán con /api/kitchens
app.use('/api/kitchens', kitchenRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('API de Cocinas Comunitarias funcionando');
});

// Exportamos la app
module.exports = app;