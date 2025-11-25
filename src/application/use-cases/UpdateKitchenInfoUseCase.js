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
    if (!kitchen) throw { http_status: 404, message: "Cocina no encontrada" };

    const ownerId = await this.kitchenRepository.findOwnerIdByKitchenId(kitchenId);
    if (ownerId !== adminUserId) {
      throw { http_status: 403, message: "No puedes editar una cocina que no te pertenece" };
    }

    await this.locationRepository.update(kitchen.locationId, {
      street_address: streetAddress,
      neighborhood,
      postal_code: postalCode,
      state_id: stateId,
      municipality_id: municipalityId
    });

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, {
      name,
      description,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      image_url: imageUrl ?? null
    });

    return updatedKitchen;
  }
}

module.exports = UpdateKitchenInfoUseCase;
