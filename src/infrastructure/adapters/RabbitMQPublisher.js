const amqp = require("amqplib");

class RabbitMQPublisher {
  constructor() {
    this.exchange = process.env.RABBITMQ_EXCHANGE;
    this.url = process.env.RABBITMQ_URL;

    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (this.channel) return;

    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchange, "topic", { durable: true });
  }

  async publish(routingKey, data) {
    if (!this.channel) await this.connect();

    this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );

    console.log("📤 Published:", routingKey, data);
  }
}

module.exports = new RabbitMQPublisher();