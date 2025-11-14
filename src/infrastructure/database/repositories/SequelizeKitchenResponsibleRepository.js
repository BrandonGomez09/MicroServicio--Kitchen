const KitchenResponsible = require('../models/KitchenResponsibleModel');

class SequelizeKitchenResponsibleRepository {
  async create(data) {
    return await KitchenResponsible.create(data);
  }

  async findByKitchenId(kitchenId) {
    return await KitchenResponsible.findOne({ where: { kitchen_id: kitchenId } });
  }
}

module.exports = SequelizeKitchenResponsibleRepository;