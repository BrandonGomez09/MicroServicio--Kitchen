// src/infrastructure/api/dependencies/dependencies.js

const SequelizeKitchenRepository = require('../../database/repositories/SequelizeKitchenRepository');
const SequelizeLocationRepository = require('../../database/repositories/SequelizeLocationRepository');

const RequestKitchenUseCase = require('../../../application/use-cases/RequestKitchenUseCase');
const GetPendingKitchensUseCase = require('../../../application/use-cases/GetPendingKitchensUseCase');
const ApproveKitchenUseCase = require('../../../application/use-cases/ApproveKitchenUseCase');
const RejectKitchenUseCase = require('../../../application/use-cases/RejectKitchenUseCase');
const RequestLocationUseCase = require('../../../application/use-cases/RequestLocationUseCase');
// Casos de uso para obtener listas
const GetApprovedKitchensUseCase = require('../../../application/use-cases/GetApprovedKitchensUseCase');
const GetRejectedKitchensUseCase = require('../../../application/use-cases/GetRejectedKitchensUseCase');

const RabbitMQPublisher = require('../../adapters/RabbitMQPublisher');
const eventPublisher = RabbitMQPublisher;

const kitchenRepository = new SequelizeKitchenRepository();
const locationRepository = new SequelizeLocationRepository();

// Instancias de casos de uso
const requestKitchenUseCase = new RequestKitchenUseCase(kitchenRepository, eventPublisher);
const getPendingKitchensUseCase = new GetPendingKitchensUseCase(kitchenRepository);
const requestLocationUseCase = new RequestLocationUseCase(locationRepository);
const approveKitchenUseCase = new ApproveKitchenUseCase(kitchenRepository, eventPublisher);
const rejectKitchenUseCase = new RejectKitchenUseCase(kitchenRepository, eventPublisher);

// Instancias de los nuevos casos de uso para listas
const getApprovedKitchensUseCase = new GetApprovedKitchensUseCase(kitchenRepository);
const getRejectedKitchensUseCase = new GetRejectedKitchensUseCase(kitchenRepository);

module.exports = {
  requestKitchenUseCase,
  getPendingKitchensUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
  requestLocationUseCase,
  // Exportaciones de los nuevos casos de uso
  getApprovedKitchensUseCase,
  getRejectedKitchensUseCase,
  
  kitchenRepository,
  locationRepository,
};