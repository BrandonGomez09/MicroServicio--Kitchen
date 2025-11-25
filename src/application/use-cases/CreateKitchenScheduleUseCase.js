const KitchenSchedule = require('../../domain/entities/KitchenSchedule');

class CreateKitchenScheduleUseCase {
  constructor(scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  async execute(kitchenId, payload) {
    await this.scheduleRepository.deleteByKitchenId(kitchenId);

    const schedules = KitchenSchedule.fromSimplified(kitchenId, payload);

    for (const schedule of schedules) {
      await this.scheduleRepository.create(schedule);
    }

    return schedules;
  }
}

module.exports = CreateKitchenScheduleUseCase;
