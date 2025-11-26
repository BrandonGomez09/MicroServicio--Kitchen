const {
  requestKitchenUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
  getPendingKitchensUseCase,
  getApprovedKitchensUseCase,
  getRejectedKitchensUseCase,
  getNearbyKitchensUseCase,
  getKitchenDetailsUseCase,
  updateKitchenInfoUseCase
} = require('../dependencies/dependencies');

class KitchenController {
  async requestKitchen(req, res) {
    try {
      const result = await requestKitchenUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        data: result
      });
    } catch (err) {
      console.error('❌ Error en requestKitchen:', err);

      res.status(500).json({
        success: false,
        message: 'Error al registrar cocina',
        error: err.message || String(err)
      });
    }
  }

  async getPendingKitchens(_req, res) {
    try {
      const data = await getPendingKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('❌ Error en getPendingKitchens:', err);
      res.status(500).json({ success: false, error: err.message || String(err) });
    }
  }

  async getApprovedKitchens(_req, res) {
    try {
      const data = await getApprovedKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('❌ Error en getApprovedKitchens:', err);
      res.status(500).json({ success: false, error: err.message || String(err) });
    }
  }

  async getRejectedKitchens(_req, res) {
    try {
      const data = await getRejectedKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('❌ Error en getRejectedKitchens:', err);
      res.status(500).json({ success: false, error: err.message || String(err) });
    }
  }

  async getNearbyKitchens(req, res) {
    try {
      const { stateId, municipalityId } = req.user;

      const kitchens = await getNearbyKitchensUseCase.execute({
        stateId,
        municipalityId
      });

      res.status(200).json({ success: true, data: kitchens });
    } catch (err) {
      console.error('❌ Error en getNearbyKitchens:', err);
      res.status(500).json({ success: false, error: err.message || String(err) });
    }
  }

  async approveKitchen(req, res) {
    try {
      const kitchenId = req.params.id;
      const result = await approveKitchenUseCase.execute(kitchenId);

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      console.error('❌ Error en approveKitchen:', err);

      res.status(err.http_status || 500).json({
        success: false,
        message: 'Error al aprobar cocina',
        error: err.message || String(err)
      });
    }
  }

  async rejectKitchen(req, res) {
    try {
      const kitchenId = req.params.id;
      const reason = req.body.reason;
      const adminUserId = req.user?.id || null;

      const result = await rejectKitchenUseCase.execute(
        kitchenId,
        reason,
        adminUserId
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      console.error('❌ Error en rejectKitchen:', err);

      res.status(err.http_status || 500).json({
        success: false,
        message: 'Error al rechazar cocina',
        error: err.message || String(err)
      });
    }
  }

  async updateKitchen(req, res) {
    try {
      const adminUserId = req.user.id;
      const kitchenId = req.params.id;
      const updates = req.body;

      const updatedKitchen = await updateKitchenInfoUseCase.execute(
        adminUserId,
        kitchenId,
        updates
      );

      res.status(200).json({
        success: true,
        message: 'Cocina actualizada correctamente',
        data: updatedKitchen
      });
    } catch (err) {
      console.error('❌ Error en updateKitchen:', err);

      res.status(err.http_status || 500).json({
        success: false,
        message: err.message || 'Error al actualizar la cocina'
      });
    }
  }

  async getKitchenDetails(req, res) {
    try {
      const kitchenId = req.params.id;
      const data = await getKitchenDetailsUseCase.execute(kitchenId);

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('❌ Error en getKitchenDetails:', err);

      res.status(err.http_status || 500).json({
        success: false,
        message: 'Error al obtener detalles de la cocina',
        error: err.message || String(err)
      });
    }
  }
}

module.exports = new KitchenController();