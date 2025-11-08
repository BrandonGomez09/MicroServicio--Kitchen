const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/KitchenController');

router.post('/', kitchenController.requestKitchen);

router.get('/pending', kitchenController.getPendingKitchens);

router.post('/:id/approve', kitchenController.approveKitchen);

router.post('/:id/reject', kitchenController.rejectKitchen);

module.exports = router;