const KitchenResponsibleModel = require('../models/KitchenResponsibleModel');
const KitchenResponsible = require('../../../domain/entities/KitchenResponsible');

class SequelizeKitchenResponsibleRepository {
  _toDomain(model) {
    if (!model) return null;
    return new KitchenResponsible(model.toJSON());
  }

  async create(data) {
    const created = await KitchenResponsibleModel.create({
      kitchen_id: data.kitchen_id,
      names: data.names,
      first_last_name: data.first_last_name,
      second_last_name: data.second_last_name || null,
      email: data.email,
      phone_number: data.phone_number
    });

    return new KitchenResponsible({
      ...created.toJSON(),
      password: data.password
    });
  }

  async findByKitchenId(kitchenId) {
    const model = await KitchenResponsibleModel.findOne({
      where: { kitchen_id: kitchenId }
    });
    return this._toDomain(model);
  }
}

module.exports = SequelizeKitchenResponsibleRepository;