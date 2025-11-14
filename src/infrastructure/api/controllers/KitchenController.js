const {
  requestKitchenUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
  getPendingKitchensUseCase,
  getApprovedKitchensUseCase,
  getRejectedKitchensUseCase,
  getNearbyKitchensUseCase,
  getKitchenDetailsUseCase
} = require('../dependencies/dependencies');

class KitchenController {

  // ==================================================
  // 1. Registrar una nueva cocina (formulario público)
  // ==================================================
  async requestKitchen(req, res) {
    try {
      const { responsible, kitchen, location } = req.body;

      // 🔥 CORRECCIÓN IMPORTANTE:
      // Location requiere contact_phone y contact_email (NOT NULL en BD)
      const refinedLocationData = {
        streetAddress: location.streetAddress,
        neighborhood: location.neighborhood,
        stateId: location.stateId,
        municipalityId: location.municipalityId,
        postalCode: location.postalCode,

        // 🔥 Se completan automáticamente
        contactPhone: kitchen.contactPhone,
        contactEmail: kitchen.contactEmail
      };

      const newKitchen = await requestKitchenUseCase.execute({
        responsible,
        kitchen,
        location: refinedLocationData
      });

      res.status(201).json({
        success: true,
        message: "Solicitud de cocina enviada correctamente",
        data: newKitchen
      });

    } catch (error) {
      console.error("❌ Error en requestKitchen:", error);
      res.status(500).json({
        success: false,
        message: "Error al registrar cocina",
        error: error.message
      });
    }
  }

  // ==================================================
  // 2. Obtener cocinas pendientes
  // ==================================================
  async getPendingKitchens(req, res) {
    try {
      const kitchens = await getPendingKitchensUseCase.execute();

      res.status(200).json({
        success: true,
        data: kitchens
      });

    } catch (error) {
      console.error("❌ Error en getPendingKitchens:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener cocinas pendientes",
        error: error.message
      });
    }
  }

  // ==================================================
  // 3. Obtener cocinas aprobadas
  // ==================================================
  async getApprovedKitchens(req, res) {
    try {
      const kitchens = await getApprovedKitchensUseCase.execute();

      res.status(200).json({
        success: true,
        data: kitchens
      });

    } catch (error) {
      console.error("❌ Error en getApprovedKitchens:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener cocinas aprobadas",
        error: error.message
      });
    }
  }

  // ==================================================
  // 4. Obtener cocinas rechazadas
  // ==================================================
  async getRejectedKitchens(req, res) {
    try {
      const kitchens = await getRejectedKitchensUseCase.execute();

      res.status(200).json({
        success: true,
        data: kitchens
      });

    } catch (error) {
      console.error("❌ Error en getRejectedKitchens:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener cocinas rechazadas",
        error: error.message
      });
    }
  }

  // ==================================================
  // 5. Aprobar una cocina
  // ==================================================
  async approveKitchen(req, res) {
    try {
      const { id } = req.params;
      const adminUserId = req.user?.id || 1;

      const result = await approveKitchenUseCase.execute(id, adminUserId);

      res.status(200).json({
        success: true,
        message: "Cocina aprobada correctamente",
        data: result
      });

    } catch (error) {
      console.error("❌ Error en approveKitchen:", error);
      res.status(500).json({
        success: false,
        message: "Error al aprobar cocina",
        error: error.message
      });
    }
  }

  // ==================================================
  // 6. Rechazar una cocina
  // ==================================================
  async rejectKitchen(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const adminUserId = req.user?.id || 1;

      const result = await rejectKitchenUseCase.execute(id, reason, adminUserId);

      res.status(200).json({
        success: true,
        message: "Cocina rechazada correctamente",
        data: result
      });

    } catch (error) {
      console.error("❌ Error en rejectKitchen:", error);
      res.status(500).json({
        success: false,
        message: "Error al rechazar cocina",
        error: error.message
      });
    }
  }

  // ==================================================
  // 7. Obtener cocinas cercanas (API Gateway inyecta stateId & municipalityId)
  // ==================================================
  async getNearbyKitchens(req, res) {
    try {
      const userState = req.user?.stateId;
      const userMunicipality = req.user?.municipalityId;

      if (!userState || !userMunicipality) {
        return res.status(400).json({
          success: false,
          message: "No se encontró información de ubicación en el token"
        });
      }

      const kitchens = await getNearbyKitchensUseCase.execute({
        stateId: userState,
        municipalityId: userMunicipality
      });

      res.status(200).json({
        success: true,
        data: kitchens
      });

    } catch (error) {
      console.error("❌ Error en getNearbyKitchens:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener cocinas cercanas",
        error: error.message
      });
    }
  }

  // ==================================================
  // 8. Obtener detalles de una cocina
  // ==================================================
  async getKitchenDetails(req, res) {
    try {
      const { id } = req.params;

      const data = await getKitchenDetailsUseCase.execute(id);

      res.status(200).json({
        success: true,
        data
      });

    } catch (error) {
      console.error("❌ Error en getKitchenDetails:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener detalles de la cocina",
        error: error.message
      });
    }
  }
}

module.exports = new KitchenController();