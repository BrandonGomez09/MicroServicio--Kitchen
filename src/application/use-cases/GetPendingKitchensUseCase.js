class GetPendingKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    const kitchens = await this.kitchenRepository.findPending();
    return kitchens;
  }
}

module.exports = GetPendingKitchensUseCase;