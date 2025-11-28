class GetNearbyKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute({ stateId, municipalityId }) {
    return await this.kitchenRepository.findByLocationIds(
      stateId,
      municipalityId
    );
  }
}

module.exports = GetNearbyKitchensUseCase;