class GetPendingKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    const kitchens = await this.kitchenRepository.findPending();
    return kitchens.map(k => k.toJSON());
  }
}

module.exports = GetPendingKitchensUseCase;