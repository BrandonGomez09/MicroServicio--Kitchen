const amqp = require("amqplib");
const rabbitmqConfig = require("../database/config/rabbitmq.config");
const SequelizeKitchenRepository = require("../database/repositories/SequelizeKitchenRepository");

class KitchenPaymentSyncConsumer {
  constructor() {
    this.conn = null;
    this.channel = null;
    
    this.queue = "kitchen_payment_sync_queue"; 
    
    this.exchange = rabbitmqConfig.exchange;
    this.routingKey = rabbitmqConfig.routingKeys.paymentAccountCreated;
    
    this.kitchenRepository = new SequelizeKitchenRepository();
  }

  async connect() {
    if (this.channel) return;
    try {
        this.conn = await amqp.connect(rabbitmqConfig.url);
        this.channel = await this.conn.createChannel();
        
        await this.channel.assertExchange(this.exchange, "topic", { durable: true });
        await this.channel.assertQueue(this.queue, { durable: true });
        
        await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);
        
        console.log("🐇 [Kitchen] Payment Sync Consumer READY");
    } catch (error) {
        console.error("❌ Error connecting Payment Consumer in Kitchen:", error);
    }
  }

  async start() {
    await this.connect();
    if (!this.channel) return;

    this.channel.consume(this.queue, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        console.log("📥 [Kitchen] Payment Info Received:", data);

        const { kitchenId, stripeCustomerId } = data;

        if (kitchenId && stripeCustomerId) {
            await this.kitchenRepository.update(kitchenId, {
                stripeCustomerId: stripeCustomerId
            });
            console.log(`✅ Kitchen ${kitchenId} vinculada con StripeID: ${stripeCustomerId}`);
        }
        
        this.channel.ack(msg);
      } catch (error) {
        console.error("Error updating kitchen with payment info:", error);
        this.channel.ack(msg);
      }
    });
  }
}

module.exports = new KitchenPaymentSyncConsumer();