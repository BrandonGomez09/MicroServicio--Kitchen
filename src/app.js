const express = require('express');
const kitchenRoutes = require('./infrastructure/api/routes/KitchenRoutes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/kitchens', kitchenRoutes);

app.get('/', (_req, res) => {
  res.send('API de Cocinas Comunitarias funcionando');
});

module.exports = app;