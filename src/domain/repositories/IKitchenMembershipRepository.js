class IKitchenMembershipRepository {
  
  async create(data) {
    throw new Error('Method "create" not implemented');
  }

  async findByKitchenId(kitchenId) {
    throw new Error('Method "findByKitchenId" not implemented');
  }

  async findByUserId(userId) {
    throw new Error('Method "findByUserId" not implemented');
  }

  async findByUserAndKitchen(userId, kitchenId) {
    throw new Error('Method "findByUserAndKitchen" not implemented');
  }
}

module.exports = IKitchenMembershipRepository;