class GetKitchenDetailsUseCase {
  constructor(kitchenRepository, locationRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error("Kitchen not found");

    const location = kitchen.locationId
      ? await this.locationRepository.findById(kitchen.locationId)
      : null;

    return { kitchen, location };
  }
}

module.exports = GetKitchenDetailsUseCase;