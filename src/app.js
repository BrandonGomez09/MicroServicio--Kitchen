const express = require('express');
const cors = require('cors');
const kitchenRoutes = require('./infrastructure/api/routes/KitchenRoutes');
const kitchenScheduleRoutes = require('./infrastructure/api/routes/KitchenScheduleRoutes')

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/kitchens', kitchenRoutes);
app.use('/api/v1/kitchens', kitchenScheduleRoutes)

app.get('/', (_req, res) => {
  res.send('API de Cocinas Comunitarias funcionando');
});

module.exports = app;
