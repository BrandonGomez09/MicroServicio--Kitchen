const KitchenSchedule = require('../../domain/entities/KitchenSchedule');

class CreateKitchenScheduleUseCase {
  constructor(scheduleRepository, kitchenRepository) {
    this.scheduleRepository = scheduleRepository;
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId, payload) {
    kitchenId = Number(kitchenId);
    if (!kitchenId || isNaN(kitchenId)) {
      throw { http_status: 400, message: "Invalid kitchenId" };
    }

    if (!payload || Object.keys(payload).length === 0) {
      throw { http_status: 400, message: "Payload cannot be empty" };
    }

    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    await this.scheduleRepository.deleteByKitchenId(kitchenId);

    let schedules;
    try {
      schedules = KitchenSchedule.fromSimplified(kitchenId, payload);
    } catch (err) {
      throw { http_status: 400, message: err.message };
    }

    for (const schedule of schedules) {
      await this.scheduleRepository.create(schedule);
    }

    return schedules;
  }
}

module.exports = CreateKitchenScheduleUseCase;