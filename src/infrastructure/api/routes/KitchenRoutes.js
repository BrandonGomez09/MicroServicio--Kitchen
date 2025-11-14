const express = require('express');
const router = express.Router();
const requireRole = require("../../../middleware/require-role");
const kitchenController = require('../dependencies/dependencies');

router.post('/request', kitchenController.requestKitchen);

router.get('/pending', requireRole("Super_admin"), kitchenController.getPendingKitchens);
router.get('/approved', requireRole("Super_admin"), kitchenController.getApprovedKitchens);
router.get('/rejected', requireRole("Super_admin"), kitchenController.getRejectedKitchens);

router.get('/nearby', kitchenController.getNearbyKitchens);

router.post('/:id/approve', requireRole("Super_admin"), kitchenController.approveKitchen);
router.post('/:id/reject', requireRole("Super_admin"), kitchenController.rejectKitchen);

router.get('/:id', kitchenController.getKitchenDetails);

module.exports = router;
