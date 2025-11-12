class GetPendingKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    const pendingKitchens = await this.kitchenRepository.findByStatus('pending');
    return pendingKitchens;
  }
}

module.exports = GetPendingKitchensUseCase;