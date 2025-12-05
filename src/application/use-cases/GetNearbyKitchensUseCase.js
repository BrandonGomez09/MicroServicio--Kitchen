class GetNearbyKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute({ stateId, municipalityId }) {
    const kitchens = await this.kitchenRepository.findByLocationIds(
      stateId,
      municipalityId
    );

    return kitchens.filter(
      k => k.approvalStatus === "approved"
    );
  }
}

module.exports = GetNearbyKitchensUseCase;