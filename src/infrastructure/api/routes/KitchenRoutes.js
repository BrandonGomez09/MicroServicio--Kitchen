// src/infrastructure/api/routes/KitchenRoutes.js

const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/KitchenController');

// Ruta para crear una nueva solicitud
router.post('/request', kitchenController.requestKitchen);
router.post('/', (req, res) => res.status(405).send('Use /api/kitchens/request for registration'));

// Rutas para OBTENER listas de cocinas
router.get('/pending', kitchenController.getPendingKitchens);
router.get('/approved', kitchenController.getApprovedKitchens);
router.get('/rejected', kitchenController.getRejectedKitchens); // <-- Esta es la ruta que añadimos

// Rutas para ACCIONES sobre una cocina específica
router.post('/:id/approve', kitchenController.approveKitchen);
router.post('/:id/reject', kitchenController.rejectKitchen);

module.exports = router;