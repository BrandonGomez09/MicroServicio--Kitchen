const rabbitmqConfig = require("../../infrastructure/database/config/rabbitmq.config");

class ApproveKitchenUseCase {
  constructor(kitchenRepository, responsibleRepository, publisher) {
    this.kitchenRepository = kitchenRepository;
    this.responsibleRepository = responsibleRepository;
    this.publisher = publisher;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    const responsible = await this.responsibleRepository.findByKitchenId(kitchenId);
    if (!responsible) {
      throw { http_status: 400, message: "Responsible user not found" };
    }

    if (!responsible.password) {
      throw { http_status: 500, message: "Missing encrypted password for responsible user" };
    }

    await this.kitchenRepository.update(kitchenId, {
      approvalStatus: "approved",
      approvalDate: new Date(),
      isActive: true
    });

    const eventPayload = {
      kitchenId,
      names: responsible.names,
      firstLastName: responsible.firstLastName,
      secondLastName: responsible.secondLastName,
      email: responsible.email,
      phoneNumber: responsible.phoneNumber,
      password: responsible.password 
    };

    await this.publisher.publish(
      rabbitmqConfig.routingKeys.kitchenAdminRegistered,
      eventPayload
    );

    console.log("📤 [Kitchen] Event 'kitchen.admin.registered' sent:", eventPayload);

    return {
      success: true,
      message: "Kitchen approved and event emitted"
    };
  }
}

module.exports = ApproveKitchenUseCase;
