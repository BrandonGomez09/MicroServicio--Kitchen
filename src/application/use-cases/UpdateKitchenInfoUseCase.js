class UpdateKitchenInfoUseCase {
  constructor(kitchenRepository, locationRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
  }

  async execute(adminUserId, kitchenId, data) {
    const {
      name,
      description,
      contactPhone,
      contactEmail,
      imageUrl,
      location: {
        streetAddress,
        neighborhood,
        postalCode,
        stateId,
        municipalityId
      }
    } = data;

    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw { http_status: 404, message: "Kitchen not found" };

    const ownerId = await this.kitchenRepository.findOwnerIdByKitchenId(kitchenId);
    if (ownerId !== adminUserId) {
      throw { http_status: 403, message: "Not your kitchen" };
    }

    await this.locationRepository.update(kitchen.locationId, {
      streetAddress,
      neighborhood,
      postalCode,
      stateId,
      municipalityId
    });

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, {
      name,
      description,
      contactPhone,
      contactEmail,
      imageUrl
    });

    return updatedKitchen;
  }
}

module.exports = UpdateKitchenInfoUseCase;