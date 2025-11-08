const SequelizeKitchenRepository = require('../../database/repositories/SequelizeKitchenRepository');
const SequelizeLocationRepository = require('../../database/repositories/SequelizeLocationRepository');

const RequestKitchenUseCase = require('../../../application/use-cases/RequestKitchenUseCase');
const GetPendingKitchensUseCase = require('../../../application/use-cases/GetPendingKitchensUseCase');
const ApproveKitchenUseCase = require('../../../application/use-cases/ApproveKitchenUseCase');
const RejectKitchenUseCase = require('../../../application/use-cases/RejectKitchenUseCase');

const kitchenRepository = new SequelizeKitchenRepository();
const locationRepository = new SequelizeLocationRepository();

const requestKitchenUseCase = new RequestKitchenUseCase(kitchenRepository);
const getPendingKitchensUseCase = new GetPendingKitchensUseCase(kitchenRepository);
const approveKitchenUseCase = new ApproveKitchenUseCase(kitchenRepository);
const rejectKitchenUseCase = new RejectKitchenUseCase(kitchenRepository);

module.exports = {
  requestKitchenUseCase,
  getPendingKitchensUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
  locationRepository,
  kitchenRepository,
};