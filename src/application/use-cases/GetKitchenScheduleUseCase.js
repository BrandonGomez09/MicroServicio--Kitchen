class GetKitchenScheduleUseCase {
  constructor(scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  async execute(kitchenId) {
    return this.scheduleRepository.findByKitchenId(kitchenId);
  }
}

module.exports = GetKitchenScheduleUseCase;
