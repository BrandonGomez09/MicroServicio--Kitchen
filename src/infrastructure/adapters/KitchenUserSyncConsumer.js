const amqp = require("amqplib");
const rabbitmqConfig = require("../database/config/rabbitmq.config");

const SequelizeResponsibleRepository = require("../database/repositories/SequelizeKitchenResponsibleRepository");
const SequelizeKitchenRepository = require("../database/repositories/SequelizeKitchenRepository");

class KitchenUserSyncConsumer {
  constructor() {
    this.conn = null;
    this.channel = null;

    this.queue = rabbitmqConfig.queues.kitchen;
    this.exchange = rabbitmqConfig.exchange;
    this.routingKey = rabbitmqConfig.routingKeys.kitchenAdminUserSynced;

    this.responsibleRepository = new SequelizeResponsibleRepository();
    this.kitchenRepository = new SequelizeKitchenRepository();
  }

  async connect() {
    if (this.channel) return;

    this.conn = await amqp.connect(rabbitmqConfig.url);
    this.channel = await this.conn.createChannel();

    await this.channel.assertExchange(this.exchange, "topic", { durable: true });
    await this.channel.assertQueue(this.queue, { durable: true });

    await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);

    console.log("🐇 [Kitchen] Consumer READY →", this.routingKey);
  }

  async start() {
    await this.connect();

    this.channel.consume(
      this.queue,
      async (msg) => {
        if (!msg) return;

        const data = JSON.parse(msg.content.toString());
        console.log("📥 [Kitchen] Received:", data);

        const { kitchenId, userId } = data;

        if (!kitchenId || !userId) {
          console.error("❌ Missing fields in received event");
          return this.channel.ack(msg);
        }

        try {
          await this.responsibleRepository.updateByKitchenId(kitchenId, {
            userId
          });

          await this.kitchenRepository.update(kitchenId, {
            ownerId: userId
          });

          console.log(
            `✅ Kitchen updated: ownerId=${userId} for kitchenId=${kitchenId}`
          );

          this.channel.ack(msg);
        } catch (err) {
          console.error("❌ Error processing event in Kitchen:", err);
          this.channel.nack(msg, false, false);
        }
      },
      { noAck: false }
    );
  }
}

module.exports = new KitchenUserSyncConsumer();