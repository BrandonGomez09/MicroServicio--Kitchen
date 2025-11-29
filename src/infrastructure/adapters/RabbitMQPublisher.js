const amqp = require("amqplib");
const rabbitmqConfig = require("../database/config/rabbitmq.config");

class RabbitMQPublisher {
  constructor() {
    this.exchange = rabbitmqConfig.exchange;
    this.conn = null;
    this.channel = null;
  }

  async connect() {
    if (this.channel) return;

    this.conn = await amqp.connect(rabbitmqConfig.url);
    this.channel = await this.conn.createChannel();

    await this.channel.assertExchange(this.exchange, "topic", { durable: true });

    console.log("🐇 [Kitchen] RabbitMQ Publisher connected");
  }

  async publish(routingKey, payload) {
    await this.connect();

    this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true }
    );

    console.log(`📤 [Kitchen] Event emitted: ${routingKey}`, payload);
  }
}

module.exports = new RabbitMQPublisher();