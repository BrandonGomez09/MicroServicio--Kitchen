const KitchenEventFactory = require("../../domain/events/KitchenEventFactory");

class RejectKitchenUseCase {
  constructor(kitchenRepository, responsibleRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.responsibleRepository = responsibleRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId, reason, adminUserId) {

    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    const responsible = await this.responsibleRepository.findByKitchenId(kitchenId);

    if (!responsible) {
      throw { http_status: 400, message: "Responsible user not found" };
    }

    await this.kitchenRepository.update(kitchenId, {
      approvalStatus: "rejected",
      rejectionReason: reason,
      isActive: false,
      approvedBy: adminUserId || null,
      approvalDate: null
    });

    const rejectedEvent = KitchenEventFactory.createRejectedEvent(
      kitchen,
      reason,
      responsible
    );

    await this.eventPublisher.publish(
      rejectedEvent.routingKey,
      rejectedEvent.payload
    );

    console.log(
      `📤 [Kitchen] Event '${rejectedEvent.routingKey}' sent:`,
      rejectedEvent.payload
    );

    return {
      success: true,
      message: "Kitchen rejected and notification event emitted"
    };
  }
}

module.exports = RejectKitchenUseCase;