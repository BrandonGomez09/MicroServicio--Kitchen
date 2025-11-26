const express = require('express');
const router = express.Router();

const requireAuth = require('../../../middleware/require-auth');
const requireRole = require('../../../middleware/require-role');
const requireKitchenOwner = require('../../../middleware/require-kitchen-owner');

const controller = require('../controllers/KitchenScheduleController');

router.post(
  '/:kitchenId/schedules',
  requireAuth,
  requireRole('Admin_cocina'),
  requireKitchenOwner,
  controller.create
);

router.put(
  '/:kitchenId/schedules',
  requireAuth,
  requireRole('Admin_cocina'),
  requireKitchenOwner,
  controller.update
);

router.get(
  '/:kitchenId/schedules',
  requireAuth,
  controller.get
);

module.exports = router;