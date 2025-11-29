class UpdateKitchenInfoUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(adminUserId, kitchenId, data) {
    const {
      description,
      contactPhone,
      contactEmail,
      imageUrl
    } = data;

    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw { http_status: 404, message: "Kitchen not found" };

    const ownerId = kitchen.ownerId;
    if (ownerId !== adminUserId) {
      throw { http_status: 403, message: "Not your kitchen" };
    }

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, {
      description,
      contactPhone,
      contactEmail,
      imageUrl
    });

    return updatedKitchen;
  }
}

module.exports = UpdateKitchenInfoUseCase;