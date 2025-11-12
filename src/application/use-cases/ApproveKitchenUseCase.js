class ApproveKitchenUseCase {
  constructor(kitchenRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId, adminUserId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error('Cocina no encontrada');

    const dataToUpdate = {
      approval_status: 'approved',
      approval_date: new Date(),
      is_active: true,
      approved_by: adminUserId,
      rejection_reason: null,
    };

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, dataToUpdate);

    // ✅ Emitir evento RabbitMQ
    await this.eventPublisher.publish('kitchen.approved', {
      kitchenId: updatedKitchen.id,
      ownerId: updatedKitchen.owner_id,
      kitchenName: updatedKitchen.name,
      approvedBy: adminUserId,
      timestamp: new Date().toISOString(),
    });

    return updatedKitchen;
  }
}

module.exports = ApproveKitchenUseCase;