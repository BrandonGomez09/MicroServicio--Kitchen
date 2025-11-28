class GetKitchenDetailsUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error("Kitchen not found");

    return {
      kitchen,
      location: kitchen.location || null,
      responsible: kitchen.responsible || null,
      schedule: kitchen.schedule || []
    };
  }
}

module.exports = GetKitchenDetailsUseCase;