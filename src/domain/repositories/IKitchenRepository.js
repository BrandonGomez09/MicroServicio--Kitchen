class IKitchenRepository {
  async create(kitchenData) {
    throw new Error('Método "create" no implementado');
  }

  async update(id, kitchenData) {
    throw new Error('Método "update" no implementado');
  }

  async findById(id) {
    throw new Error('Método "findById" no implementado');
  }

  async findOwnerIdByKitchenId(id) {
    throw new Error('Método "findOwnerIdByKitchenId" no implementado');
  }

  async findPending() {
    throw new Error('Método "findPending" no implementado');
  }

  async findApproved() {
    throw new Error('Método "findApproved" no implementado');
  }

  async findRejected() {
    throw new Error('Método "findRejected" no implementado');
  }

  async findByLocationIds(locationIds) {
    throw new Error('Método "findByLocationIds" no implementado');
  }
}

module.exports = IKitchenRepository;