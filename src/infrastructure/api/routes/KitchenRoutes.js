const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/KitchenController');

// --- Definición de Endpoints ---

// POST /api/kitchens
// Endpoint para crear una nueva solicitud de cocina
router.post('/', kitchenController.requestKitchen);

// GET /api/kitchens/pending
// Endpoint para que el admin vea las solicitudes pendientes
router.get('/pending', kitchenController.getPendingKitchens);

// POST /api/kitchens/:id/approve
// Endpoint para que el admin apruebe una cocina
router.post('/:id/approve', kitchenController.approveKitchen);

// POST /api/kitchens/:id/reject
// Endpoint para que el admin rechace una cocina
router.post('/:id/reject', kitchenController.rejectKitchen);

module.exports = router;