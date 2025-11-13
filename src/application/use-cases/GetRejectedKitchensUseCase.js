// src/application/use-cases/GetRejectedKitchensUseCase.js

class GetRejectedKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    const rejectedKitchens = await this.kitchenRepository.findByStatus('rejected');
    return rejectedKitchens;
  }
}

module.exports = GetRejectedKitchensUseCase;