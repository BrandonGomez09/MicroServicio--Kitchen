const express = require('express');
const router = express.Router();

const requireAuth = require('../../../middleware/require-auth');
const requireRole = require('../../../middleware/require-role');
const requireKitchenOwner = require('../../../middleware/require-kitchen-owner');

const controller = require('../controllers/KitchenController');

router.post('/request', controller.requestKitchen);

router.get('/pending', requireRole('Super_admin'), controller.getPendingKitchens);
router.get('/approved', requireRole('Super_admin'), controller.getApprovedKitchens);
router.get('/rejected', requireRole('Super_admin'), controller.getRejectedKitchens);
router.get('/nearby', requireRole('Voluntario'), controller.getNearbyKitchens);

// --- RUTAS DE VOLUNTARIOS ---

router.get(
  '/subscribed/me', 
  requireRole('Voluntario'), 
  controller.getMySubscriptions
);

router.post(
  '/:id/subscribe',
  requireRole('Voluntario'),
  controller.subscribe
);

// --- RUTAS DE ADMIN DE COCINA ---

// 1. Obtener MI cocina (Para saber mi ID) - ¡IMPORTANTE: ANTES DE /:id!
router.get(
  '/me',
  requireAuth,
  requireRole('Admin_cocina'),
  controller.getMyKitchen
);

// 2. Ver suscriptores
router.get(
  '/:id/subscribers',
  requireRole(['Admin_cocina', 'Super_admin']), // Ajustado para permitir Super Admin en pruebas
  controller.getSubscribers
);

// --- GESTIÓN DE COCINAS (SUPER ADMIN) ---

router.post('/:id/approve', requireRole('Super_admin'), controller.approveKitchen);
router.post('/:id/reject', requireRole('Super_admin'), controller.rejectKitchen);

// --- GESTIÓN DE COCINAS (DUEÑO) ---

router.put(
  '/:id',
  requireAuth,
  requireRole('Admin_cocina'),
  requireKitchenOwner,
  controller.updateKitchen
);

// --- PÚBLICO / COMPARTIDO ---
router.get('/:id', requireAuth, controller.getKitchenDetails);

module.exports = router;