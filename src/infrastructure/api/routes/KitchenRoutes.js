// Path: didiercito-microservicio--kitchen/src/infrastructure/api/routes/KitchenRoutes.js

const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/KitchenController');

// Ruta para el registro completo de cocina (invocada por Auth Service)
router.post('/request', kitchenController.requestKitchen);

// Esto asegura que la ruta base POST no sea ambigua
router.post('/', (req, res) => res.status(405).send('Use /api/kitchens/request for registration'));

router.get('/pending', kitchenController.getPendingKitchens);

router.post('/:id/approve', kitchenController.approveKitchen);

router.post('/:id/reject', kitchenController.rejectKitchen);

module.exports = router;