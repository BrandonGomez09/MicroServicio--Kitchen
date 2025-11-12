const Kitchen = require('../../domain/entities/Kitchen');

class RequestKitchenUseCase {
  constructor(kitchenRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(requestData) {
    const kitchen = new Kitchen({
      ...requestData,
      approval_status: 'pending',
      is_active: false,
      registration_date: new Date(),
    });

    const newKitchen = await this.kitchenRepository.create(kitchen);

    // ✅ Emitir evento RabbitMQ
    await this.eventPublisher.publish('kitchen.pending', {
      userId: newKitchen.owner_id || 0,
      kitchenId: newKitchen.id,
      kitchenName: newKitchen.name,
      timestamp: new Date().toISOString(),
    });

    return newKitchen;
  }
}

module.exports = RequestKitchenUseCase;