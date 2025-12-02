require("dotenv").config();

module.exports = {
  url: process.env.RABBITMQ_URL || "",
  exchange: process.env.RABBITMQ_EXCHANGE || "kitchen_events",
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

    kitchenPending:
      process.env.RABBITMQ_ROUTINGKEY_KITCHEN_PENDING ||
      "kitchen.pending",

    kitchenApproved:
      process.env.RABBITMQ_ROUTINGKEY_KITCHEN_APPROVED ||
      "kitchen.approved",

    kitchenRejected:
      process.env.RABBITMQ_ROUTINGKEY_KITCHEN_REJECTED ||
      "kitchen.rejected",

    paymentAccountCreated:
      process.env.RABBITMQ_ROUTINGKEY_PAYMENT_ACCOUNT_CREATED ||
      "payment.kitchen.created"
  },

  options: {
    durable: true,
    persistent: true,
    prefetch: 10
  }
};