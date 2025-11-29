class RejectKitchenUseCase {
  constructor(kitchenRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId, reason, adminUserId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error("Kitchen not found");

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, {
      approvalStatus: "rejected",
      rejectionReason: reason,
      isActive: false,
      approvedBy: null,
      approvalDate: null
    });

    await this.eventPublisher.publish("kitchen.rejected", {
      kitchenId: updatedKitchen.id,
      ownerId: updatedKitchen.ownerId,
      kitchenName: updatedKitchen.name,
      rejectionReason: reason,
      rejectedBy: adminUserId,
      timestamp: new Date().toISOString()
    });

    return updatedKitchen;
  }
}

module.exports = RejectKitchenUseCase;