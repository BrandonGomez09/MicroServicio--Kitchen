class GetNearbyKitchensUseCase {
  constructor(kitchenRepository, locationRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
  }

  async execute({ stateId, municipalityId }) {
    const locations = await this.locationRepository.findByStateAndMunicipality(
      stateId,
      municipalityId
    );

    const ids = locations.map(l => l.id);

    return await this.kitchenRepository.findByLocationIds(ids);
  }
}

module.exports = GetNearbyKitchensUseCase;