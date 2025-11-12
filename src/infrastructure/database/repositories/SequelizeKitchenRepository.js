const IKitchenRepository = require('../../../domain/repositories/IKitchenRepository');
const KitchenModel = require('../models/KitchenModel');
const Kitchen = require('../../../domain/entities/Kitchen');

class SequelizeKitchenRepository extends IKitchenRepository {
  
  _toDomain(sequelizeKitchen) {
    if (!sequelizeKitchen) return null;
    return new Kitchen(sequelizeKitchen.toJSON());
  }

  async create(kitchenData) {
    const newKitchen = await KitchenModel.create({
        name: kitchenData.name,
        description: kitchenData.description,
        owner_id: kitchenData.owner_id,
        location_id: kitchenData.location_id,
        contact_phone: kitchenData.contact_phone,
        contact_email: kitchenData.contact_email,
        approval_status: 'pending',
        is_active: false,
        registration_date: new Date()
    });
    return this._toDomain(newKitchen);
  }

  async update(id, kitchenData) {
    await KitchenModel.update(kitchenData, {
      where: { id: id },
    });
    return this.findById(id);
  }

  async findById(id) {
    const kitchen = await KitchenModel.findByPk(id);
    return this._toDomain(kitchen);
  }

  async findByStatus(status) {
    const kitchens = await KitchenModel.findAll({
      where: { approval_status: status },
    });
    return kitchens.map(this._toDomain);
  }

  async findAll() {
    const kitchens = await KitchenModel.findAll();
    return kitchens.map(this._toDomain);
  }
}

module.exports = SequelizeKitchenRepository;