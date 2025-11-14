class GetKitchenDetailsUseCase {
  constructor(kitchenRepository, locationRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw new Error('Cocina no encontrada');
    }

    let location = null;
    if (kitchen.location_id) {
      location = await this.locationRepository.findById(kitchen.location_id);
    }

    return {
      kitchen,
      location,
    };
  }
}

module.exports = GetKitchenDetailsUseCase;
