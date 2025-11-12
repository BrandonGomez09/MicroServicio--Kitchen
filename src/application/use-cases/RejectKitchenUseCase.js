class RejectKitchenUseCase {
  constructor(kitchenRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId, reason, adminUserId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error('Cocina no encontrada');

    const dataToUpdate = {
      approval_status: 'rejected',
      is_active: false,
      rejection_reason: reason,
      approval_date: null,
      approved_by: null,
    };

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, dataToUpdate);

    // ✅ Emitir evento RabbitMQ
    await this.eventPublisher.publish('kitchen.rejected', {
      kitchenId: updatedKitchen.id,
      ownerId: updatedKitchen.owner_id,
      kitchenName: updatedKitchen.name,
      rejectionReason: reason,
      rejectedBy: adminUserId,
      timestamp: new Date().toISOString(),
    });

    return updatedKitchen;
  }
}

module.exports = RejectKitchenUseCase;
