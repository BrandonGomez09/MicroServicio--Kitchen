// src/infrastructure/api/controllers/KitchenController.js

const {
  requestKitchenUseCase,
  getPendingKitchensUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
  requestLocationUseCase,
  getApprovedKitchensUseCase,
  getRejectedKitchensUseCase // Importamos el nuevo método
} = require('../dependencies/dependencies');

class KitchenController {
  
  // Método para crear una solicitud (sin cambios)
  async requestKitchen(req, res) {
    try {
      const data = req.body;
      console.log('📦 Body recibido en el controlador:', JSON.stringify(data, null, 2));
      const locationPayload = data.location;
      const kitchenPayload = data.kitchen;
      const userPayload = data.user; 
      const locationData = {
        street_address: locationPayload.streetAddress,
        neighborhood: locationPayload.neighborhood,
        state_id: locationPayload.stateId,
        municipality_id: locationPayload.municipalityId,
        postal_code: locationPayload.postalCode,
        capacity: locationPayload.capacity || null, 
        contact_phone: kitchenPayload.contactPhone,
        contact_email: kitchenPayload.contactEmail,
        name: kitchenPayload.name 
      };
      console.log('📍 Datos preparados para LocationUseCase:', locationData);
      const newLocation = await requestLocationUseCase.execute(locationData);
      const kitchenData = {
        name: kitchenPayload.name,
        description: kitchenPayload.description,
        owner_id: userPayload.id || 1, 
        location_id: newLocation.id, 
        contact_phone: kitchenPayload.contactPhone,
        contact_email: kitchenPayload.contactEmail,
        image_url: kitchenPayload.image_url || null, 
      };
      console.log('🍽️ Datos preparados para KitchenUseCase:', kitchenData);
      const newKitchen = await requestKitchenUseCase.execute(kitchenData);
      res.status(201).json(newKitchen);
    } catch (error) {
      console.error('❌ Error detallado en requestKitchen:', error.message);
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
  }

  // Método para obtener cocinas PENDIENTES
  async getPendingKitchens(req, res) {
    try {
      const pendingKitchens = await getPendingKitchensUseCase.execute();
      res.status(200).json({ success: true, data: pendingKitchens });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener solicitudes', error: error.message });
    }
  }

  // Método para obtener cocinas APROBADAS
  async getApprovedKitchens(req, res) {
    try {
      const approvedKitchens = await getApprovedKitchensUseCase.execute();
      res.status(200).json({ success: true, data: approvedKitchens });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener cocinas aprobadas', error: error.message });
    }
  }

  // --- AÑADIR EL NUEVO MÉTODO PARA RECHAZADAS ---
  async getRejectedKitchens(req, res) {
    try {
      const rejectedKitchens = await getRejectedKitchensUseCase.execute();
      res.status(200).json({ success: true, data: rejectedKitchens });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener cocinas rechazadas', error: error.message });
    }
  }
  // --- FIN DEL NUEVO MÉTODO ---

  // Método para APROBAR (sin cambios)
  async approveKitchen(req, res) {
    try {
      const { id } = req.params;
      const adminUserId = req.user?.id || 1; 
      const result = await approveKitchenUseCase.execute(id, adminUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para RECHAZAR (sin cambios)
  async rejectKitchen(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const adminUserId = req.user?.id || 1;
      const result = await rejectKitchenUseCase.execute(id, reason, adminUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new KitchenController();