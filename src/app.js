// src/app.js

const express = require('express');
const cors = require('cors'); // <--- 1. IMPORTAMOS CORS
const kitchenRoutes = require('./infrastructure/api/routes/KitchenRoutes');

const app = express();

// --- 2. HABILITAMOS CORS ---
// Esto le dice a tu backend que acepte peticiones de cualquier origen.
// Para producción, se configuraría solo para aceptar 'http://localhost:5173'
app.use(cors()); 

// --- El resto de tu código (sin cambios) ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/kitchens', kitchenRoutes);

app.get('/', (_req, res) => {
  res.send('API de Cocinas Comunitarias funcionando');
});

module.exports = app;