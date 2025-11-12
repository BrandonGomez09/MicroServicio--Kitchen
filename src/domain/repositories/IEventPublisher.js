class IEventPublisher {
  async publish(eventName, data) {
    throw new Error('Método "publish" no implementado');
  }
}

module.exports = IEventPublisher;