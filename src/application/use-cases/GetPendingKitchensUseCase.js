class GetPendingKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    return await this.kitchenRepository.findPending();
  }
}

module.exports = GetPendingKitchensUseCase;
