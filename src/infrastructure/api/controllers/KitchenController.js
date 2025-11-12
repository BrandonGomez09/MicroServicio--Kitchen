const {
  requestKitchenUseCase,
  getPendingKitchensUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
  requestLocationUseCase,
} = require('../dependencies/dependencies');

class KitchenController {
  async requestKitchen(req, res) {
    try {
      const data = req.body;

      const locationData = {
        street_address: data.street_address,
        neighborhood: data.neighborhood,
        state_id: data.state_id,
        municipality_id: data.municipality_id,
        postal_code: data.postal_code,
        capacity: data.capacity,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
        name: data.name
      };
      console.log('📦 Body recibido en el controlador:', req.body);
      const newLocation = await requestLocationUseCase.execute(locationData);

      const kitchenData = {
        name: data.name,
        description: data.description,
        owner_id: data.owner_id,
        location_id: newLocation.id,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
        image_url: data.image_url,
      };
      console.log('📦 Body recibido en el controlador:', req.body);
      const newKitchen = await requestKitchenUseCase.execute(kitchenData);

      res.status(201).json(newKitchen);
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
  }

  async getPendingKitchens(req, res) {
    try {
      const pendingKitchens = await getPendingKitchensUseCase.execute();
      res.status(200).json(pendingKitchens);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
    }
  }

  async approveKitchen(req, res) {
    try {
      const { id } = req.params;
      const adminUserId = req.user?.id || '';
      const result = await dependencies.approveKitchenUseCase.execute(id, adminUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async rejectKitchen(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const adminUserId = req.user?.id || 1;
      const result = await dependencies.rejectKitchenUseCase.execute(id, reason, adminUserId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new KitchenController();