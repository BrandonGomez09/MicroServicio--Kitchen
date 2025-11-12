const amqp = require('amqplib');

class RabbitMQPublisher {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.exchange = process.env.RABBITMQ_EXCHANGE || 'bim_exchange';
  }

  async connect() {
    if (this.connection) return; // evitar reconexiones múltiples
    try {
      const url = process.env.RABBITMQ_URL;
      if (!url) throw new Error('❌ RABBITMQ_URL no está definida en .env');

      console.log('🐇 [KITCHEN] Conectando a RabbitMQ...');
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
      console.log('✅ [KITCHEN] Conectado a RabbitMQ correctamente');
    } catch (error) {
      console.error('❌ [KITCHEN] Error conectando a RabbitMQ:', error);
    }
  }

  async publish(routingKey, payload) {
    try {
      if (!this.channel) await this.connect();

      const message = Buffer.from(JSON.stringify(payload));
      this.channel.publish(this.exchange, routingKey, message, { persistent: true });

      console.log(`📤 [KITCHEN] Evento publicado → ${routingKey}`, payload);
    } catch (error) {
      console.error(`❌ [KITCHEN] Error al publicar evento ${routingKey}:`, error);
    }
  }
}

module.exports = new RabbitMQPublisher();