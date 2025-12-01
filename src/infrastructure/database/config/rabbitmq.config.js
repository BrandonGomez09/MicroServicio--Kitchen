require("dotenv").config();

module.exports = {
  url: process.env.RABBITMQ_URL || "",
  exchange: process.env.RABBITMQ_EXCHANGE || "auth_events",
  exchangeType: "topic",

  queues: {
    kitchen: process.env.RABBITMQ_QUEUE_KITCHEN || "kitchen_queue"
  },

  routingKeys: {
    kitchenAdminRegistered:
      process.env.RABBITMQ_ROUTINGKEY_KITCHEN_ADMIN_REGISTERED ||
      "kitchen.admin.registered",

    kitchenAdminUserSynced:
      process.env.RABBITMQ_ROUTINGKEY_KITCHEN_ADMIN_USER_SYNCED ||
      "kitchen.admin.userId.synced",
      
    paymentAccountCreated: "payment.kitchen.created"
  },

  options: {
    durable: true,
    persistent: true,
    prefetch: 10
  }
};