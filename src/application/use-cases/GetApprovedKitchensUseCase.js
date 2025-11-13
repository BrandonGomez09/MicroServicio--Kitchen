// src/application/use-cases/GetApprovedKitchensUseCase.js

class GetApprovedKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    // Es idéntico al 'pending', pero busca 'approved'
    const approvedKitchens = await this.kitchenRepository.findByStatus('approved');
    return approvedKitchens;
  }
}

module.exports = GetApprovedKitchensUseCase;