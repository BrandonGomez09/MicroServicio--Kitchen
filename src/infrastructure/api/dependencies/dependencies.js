const SequelizeKitchenRepository = require('../../database/repositories/SequelizeKitchenRepository');
const SequelizeLocationRepository = require('../../database/repositories/SequelizeLocationRepository');
const SequelizeKitchenResponsibleRepository = require('../../database/repositories/SequelizeKitchenResponsibleRepository');

const RequestKitchenUseCase = require('../../../application/use-cases/RequestKitchenUseCase');
const ApproveKitchenUseCase = require('../../../application/use-cases/ApproveKitchenUseCase');
const RejectKitchenUseCase = require('../../../application/use-cases/RejectKitchenUseCase');

const GetPendingKitchensUseCase = require('../../../application/use-cases/GetPendingKitchensUseCase');
const GetApprovedKitchensUseCase = require('../../../application/use-cases/GetApprovedKitchensUseCase');
const GetRejectedKitchensUseCase = require('../../../application/use-cases/GetRejectedKitchensUseCase');

const GetNearbyKitchensUseCase = require('../../../application/use-cases/GetNearbyKitchensUseCase');
const GetKitchenDetailsUseCase = require('../../../application/use-cases/GetKitchenDetailsUseCase');

const RabbitMQPublisher = require('../../adapters/RabbitMQPublisher');

const kitchenRepository = new SequelizeKitchenRepository();
const locationRepository = new SequelizeLocationRepository();
const responsibleRepository = new SequelizeKitchenResponsibleRepository();

const requestKitchenUseCase = new RequestKitchenUseCase(
  kitchenRepository,
  locationRepository,
  responsibleRepository,
  RabbitMQPublisher
);

const approveKitchenUseCase = new ApproveKitchenUseCase(
  kitchenRepository,
  responsibleRepository,
  RabbitMQPublisher
);

const rejectKitchenUseCase = new RejectKitchenUseCase(
  kitchenRepository,
  RabbitMQPublisher
);

const getPendingKitchensUseCase = new GetPendingKitchensUseCase(kitchenRepository);
const getApprovedKitchensUseCase = new GetApprovedKitchensUseCase(kitchenRepository);
const getRejectedKitchensUseCase = new GetRejectedKitchensUseCase(kitchenRepository);

const getNearbyKitchensUseCase = new GetNearbyKitchensUseCase(
  kitchenRepository,
  locationRepository
);

const getKitchenDetailsUseCase = new GetKitchenDetailsUseCase(
  kitchenRepository,
  locationRepository,
  responsibleRepository
);

module.exports = {
  requestKitchen: async (req, res) => {
    try {
      const result = await requestKitchenUseCase.execute(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al registrar cocina",
        error: err.message
      });
    }
  },

  approveKitchen: async (req, res) => {
    try {
      const result = await approveKitchenUseCase.execute(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al aprobar cocina",
        error: err.message
      });
    }
  },

  rejectKitchen: async (req, res) => {
    try {
      const result = await rejectKitchenUseCase.execute(req.params.id, req.body.reason);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al rechazar cocina",
        error: err.message
      });
    }
  },

  getPendingKitchens: async (_req, res) => {
    try {
      const data = await getPendingKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getApprovedKitchens: async (_req, res) => {
    try {
      const data = await getApprovedKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getRejectedKitchens: async (_req, res) => {
    try {
      const data = await getRejectedKitchensUseCase.execute();
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getNearbyKitchens: async (req, res) => {
    try {
      const data = await getNearbyKitchensUseCase.execute(req.query);
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  getKitchenDetails: async (req, res) => {
    try {
      const data = await getKitchenDetailsUseCase.execute(req.params.id);
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(err.http_status || 500).json({
        success: false,
        message: "Error al obtener detalles de la cocina",
        error: err.message
      });
    }
  }
};
