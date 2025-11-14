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

    if (!locations || locations.length === 0) {
      return [];
    }

    const locationIds = locations.map((loc) => loc.id);

    const approvedKitchens = await this.kitchenRepository.findByStatus('approved');

    const nearbyKitchens = approvedKitchens.filter(
      (kitchen) =>
        kitchen.is_active === true &&
        locationIds.includes(kitchen.location_id)
    );

    return nearbyKitchens;
  }
}

module.exports = GetNearbyKitchensUseCase;
