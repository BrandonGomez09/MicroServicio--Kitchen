class GetKitchenScheduleUseCase {
  constructor(scheduleRepository, kitchenRepository) {
    this.scheduleRepository = scheduleRepository;
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId) {
    kitchenId = Number(kitchenId);
    if (!kitchenId || isNaN(kitchenId)) {
      throw { http_status: 400, message: "Invalid kitchenId" };
    }

    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    return await this.scheduleRepository.findByKitchenId(kitchenId);
  }
}

module.exports = GetKitchenScheduleUseCase;