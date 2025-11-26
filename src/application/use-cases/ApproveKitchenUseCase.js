const {
  getTemporaryPassword,
  clearTemporaryPassword
} = require("../../infrastructure/store/temp-password.store");

class ApproveKitchenUseCase {
  constructor(kitchenRepository, responsibleRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.responsibleRepository = responsibleRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw { http_status: 404, message: "Kitchen not found" };

    const responsible = await this.responsibleRepository.findByKitchenId(kitchenId);

    const password = getTemporaryPassword(kitchenId);
    if (!password) {
      throw { http_status: 500, message: "Missing password for responsible user" };
    }

    await this.kitchenRepository.update(kitchenId, {
      approvalStatus: "approved",
      isActive: true
    });

    await this.eventPublisher.publish("kitchen.admin.registered", {
      kitchenId,
      names: responsible.names,
      firstLastName: responsible.firstLastName,
      secondLastName: responsible.secondLastName,
      email: responsible.email,
      phoneNumber: responsible.phoneNumber,
      password
    });

    clearTemporaryPassword(kitchenId);

    return kitchen;
  }
}

module.exports = ApproveKitchenUseCase;