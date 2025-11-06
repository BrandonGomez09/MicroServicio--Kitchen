// 1. Importamos los casos de uso ya "inyectados"
const {
  requestKitchenUseCase,
  getPendingKitchensUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
} = require('../dependencies/dependencies');

class KitchenController {
  // --- POST /api/kitchens ---
  async requestKitchen(req, res) {
    try {
      // 2. El body de la solicitud (los datos del formulario)
      const data = req.body;
      // Asumimos que el front nos manda 'owner_id' y 'location_id'
      const newKitchen = await requestKitchenUseCase.execute(data);
      res.status(201).json(newKitchen);
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
  }

  // --- GET /api/kitchens/pending ---
  async getPendingKitchens(req, res) {
    try {
      const pendingKitchens = await getPendingKitchensUseCase.execute();
      res.status(200).json(pendingKitchens);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
    }
  }

  // --- POST /api/kitchens/:id/approve ---
  async approveKitchen(req, res) {
    try {
      const { id } = req.params; // El ID de la cocina (ej. 123)
      // Asumimos que tenemos la ID del admin (ej. por auth)
      // Por ahora, la pondremos quemada como '1'
      const adminUserId = 1; 

      const updatedKitchen = await approveKitchenUseCase.execute(id, adminUserId);
      res.status(200).json(updatedKitchen);
    } catch (error) {
      res.status(500).json({ message: 'Error al aprobar la cocina', error: error.message });
    }
  }

  // --- POST /api/kitchens/:id/reject ---
  async rejectKitchen(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body; // El front nos debe mandar el motivo
      const adminUserId = 1; // ID del admin quemada por ahora

      if (!reason) {
        return res.status(400).json({ message: 'Se requiere un motivo para rechazar' });
      }

      const updatedKitchen = await rejectKitchenUseCase.execute(id, reason, adminUserId);
      res.status(200).json(updatedKitchen);
    } catch (error) {
      res.status(500).json({ message: 'Error al rechazar la cocina', error: error.message });
    }
  }
}

// Exportamos una única instancia del controlador
module.exports = new KitchenController();