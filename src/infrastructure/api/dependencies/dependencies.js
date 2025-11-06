// --- 1. Importar Implementaciones ---
const SequelizeKitchenRepository = require('../../database/repositories/SequelizeKitchenRepository');

// --- 2. Importar Casos de Uso ---
const RequestKitchenUseCase = require('../../../application/use-cases/RequestKitchenUseCase');
const GetPendingKitchensUseCase = require('../../../application/use-cases/GetPendingKitchensUseCase');
const ApproveKitchenUseCase = require('../../../application/use-cases/ApproveKitchenUseCase');
const RejectKitchenUseCase = require('../../../application/use-cases/RejectKitchenUseCase');

// --- 3. Crear Instancias ---

// Primero, creamos la instancia del repositorio
const kitchenRepository = new SequelizeKitchenRepository();

// Ahora, "inyectamos" el repositorio en cada caso de uso
const requestKitchenUseCase = new RequestKitchenUseCase(kitchenRepository);
const getPendingKitchensUseCase = new GetPendingKitchensUseCase(kitchenRepository);
const approveKitchenUseCase = new ApproveKitchenUseCase(kitchenRepository);
const rejectKitchenUseCase = new RejectKitchenUseCase(kitchenRepository);

// --- 4. Exportar Casos de Uso listos ---
module.exports = {
  requestKitchenUseCase,
  getPendingKitchensUseCase,
  approveKitchenUseCase,
  rejectKitchenUseCase,
};