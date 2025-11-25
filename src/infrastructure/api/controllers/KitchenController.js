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
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error al registrar cocina",
        error: err.message
      });
    }
  }

  async getPendingKitchens(_req, res) {
    try {
      const data = await getPendingKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
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
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getApprovedKitchens(_req, res) {
    try {
      const data = await getApprovedKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getRejectedKitchens(_req, res) {
    try {
      const data = await getRejectedKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async approveKitchen(req, res) {
    try {
      const kitchenId = req.params.id;
      const result = await approveKitchenUseCase.execute(kitchenId);

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al aprobar cocina",
        error: err.message
      });
    }
  }

  async rejectKitchen(req, res) {
    try {
      const kitchenId = req.params.id;
      const reason = req.body.reason;

      const result = await rejectKitchenUseCase.execute(kitchenId, reason);

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al rechazar cocina",
        error: err.message
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
        message: "Cocina actualizada correctamente",
        data: updatedKitchen
      });
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: err.message || "Error al actualizar la cocina"
      });
    }
  }

  async getKitchenDetails(req, res) {
    try {
      const kitchenId = req.params.id;
      const data = await getKitchenDetailsUseCase.execute(kitchenId);

      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al obtener detalles de la cocina",
        error: err.message
      });
    }
  }
}

module.exports = new KitchenController();
