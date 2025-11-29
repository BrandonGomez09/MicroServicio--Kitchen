const SequelizeKitchenRepository = require('../../database/repositories/SequelizeKitchenRepository');
const SequelizeLocationRepository = require('../../database/repositories/SequelizeLocationRepository');
const SequelizeKitchenResponsibleRepository = require('../../database/repositories/SequelizeKitchenResponsibleRepository');
const SequelizeKitchenScheduleRepository = require('../../database/repositories/SequelizeKitchenScheduleRepository');

const RequestKitchenUseCase = require('../../../application/use-cases/RequestKitchenUseCase');
const ApproveKitchenUseCase = require('../../../application/use-cases/ApproveKitchenUseCase');
const RejectKitchenUseCase = require('../../../application/use-cases/RejectKitchenUseCase');

const GetPendingKitchensUseCase = require('../../../application/use-cases/GetPendingKitchensUseCase');
const GetApprovedKitchensUseCase = require('../../../application/use-cases/GetApprovedKitchensUseCase');
const GetRejectedKitchensUseCase = require('../../../application/use-cases/GetRejectedKitchensUseCase');

const GetNearbyKitchensUseCase = require('../../../application/use-cases/GetNearbyKitchensUseCase');
const GetKitchenDetailsUseCase = require('../../../application/use-cases/GetKitchenDetailsUseCase');

const CreateKitchenScheduleUseCase = require('../../../application/use-cases/CreateKitchenScheduleUseCase');
const UpdateKitchenScheduleUseCase = require('../../../application/use-cases/UpdateKitchenScheduleUseCase');
const GetKitchenScheduleUseCase = require('../../../application/use-cases/GetKitchenScheduleUseCase');

const UpdateKitchenInfoUseCase = require('../../../application/use-cases/UpdateKitchenInfoUseCase');

const rabbitMQPublisher = require('../../adapters/RabbitMQPublisher');

const kitchenRepository = new SequelizeKitchenRepository();
const locationRepository = new SequelizeLocationRepository();
const responsibleRepository = new SequelizeKitchenResponsibleRepository();
const scheduleRepository = new SequelizeKitchenScheduleRepository();

module.exports = {
  requestKitchenUseCase: new RequestKitchenUseCase(
    kitchenRepository,
    locationRepository,
    responsibleRepository
  ),

  approveKitchenUseCase: new ApproveKitchenUseCase(
    kitchenRepository,
    responsibleRepository,
    rabbitMQPublisher
  ),

  rejectKitchenUseCase: new RejectKitchenUseCase(
    kitchenRepository,
    rabbitMQPublisher
  ),

  getPendingKitchensUseCase: new GetPendingKitchensUseCase(kitchenRepository),
  getApprovedKitchensUseCase: new GetApprovedKitchensUseCase(kitchenRepository),
  getRejectedKitchensUseCase: new GetRejectedKitchensUseCase(kitchenRepository),

  getNearbyKitchensUseCase: new GetNearbyKitchensUseCase(
    kitchenRepository,
    locationRepository
  ),

  getKitchenDetailsUseCase: new GetKitchenDetailsUseCase(
    kitchenRepository,
    locationRepository
  ),

  createKitchenScheduleUseCase: new CreateKitchenScheduleUseCase(
    scheduleRepository,
    kitchenRepository
  ),

  updateKitchenScheduleUseCase: new UpdateKitchenScheduleUseCase(
    scheduleRepository,
    kitchenRepository
  ),

  getKitchenScheduleUseCase: new GetKitchenScheduleUseCase(
    scheduleRepository,
    kitchenRepository
  ),

  updateKitchenInfoUseCase: new UpdateKitchenInfoUseCase(
    kitchenRepository,
  )
};