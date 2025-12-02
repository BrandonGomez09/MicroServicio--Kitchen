const rabbitmqConfig = require("../../infrastructure/database/config/rabbitmq.config");

class KitchenEventFactory {

  static createPendingEvent(kitchen, responsible) {
    return {
      routingKey: rabbitmqConfig.routingKeys.kitchenPending,
      payload: {
        kitchenId: kitchen.id,
        kitchenName: kitchen.name,
        ownerId: responsible.id,
        email: responsible.email,
        fullName: `${responsible.names} ${responsible.firstLastName} ${responsible.secondLastName}`,
        timestamp: new Date().toISOString()
      }
    };
  }

  static createApprovedEvent(kitchen, responsible) {
    return {
      routingKey: rabbitmqConfig.routingKeys.kitchenApproved,
      payload: {
        kitchenId: kitchen.id,
        kitchenName: kitchen.name,
        ownerId: responsible.id,
        email: responsible.email,
        fullName: `${responsible.names} ${responsible.firstLastName} ${responsible.secondLastName}`,
        timestamp: new Date().toISOString()
      }
    };
  }

  static createRejectedEvent(kitchen, reason, responsible) {
    return {
      routingKey: rabbitmqConfig.routingKeys.kitchenRejected,
      payload: {
        kitchenId: kitchen.id,
        kitchenName: kitchen.name,
        ownerId: responsible.id,
        email: responsible.email,
        fullName: `${responsible.names} ${responsible.firstLastName} ${responsible.secondLastName}`,
        rejectionReason: reason,
        timestamp: new Date().toISOString()
      }
    };
  }
}

module.exports = KitchenEventFactory;