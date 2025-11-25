const { getTemporaryPassword, clearTemporaryPassword } = require("../../infrastructure/store/temp-password.store");

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
    if (!responsible) throw { http_status: 500, message: "Kitchen responsible not found" };

    const password = getTemporaryPassword(kitchenId);
    if (!password) throw { http_status: 500, message: "Temporary password missing" };

    kitchen.approvalStatus = "approved";
    kitchen.isActive = true;

    const updatedKitchen = await this.kitchenRepository.update(kitchenId, kitchen);

    await this.eventPublisher.publish("kitchen.admin.registered", {
      names: responsible.names,
      firstLastName: responsible.firstLast_name,
      secondLastName: responsible.secondLast_name,
      email: responsible.email,
      phoneNumber: responsible.phone_number,
      password
    });

    clearTemporaryPassword(kitchenId);

    return updatedKitchen;
  }
}

module.exports = ApproveKitchenUseCase;