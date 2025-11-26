const KitchenResponsibleModel = require("../models/KitchenResponsibleModel");
const KitchenResponsible = require("../../../domain/entities/KitchenResponsible");

class SequelizeKitchenResponsibleRepository {
  _toDomain(model) {
    if (!model) return null;
    return new KitchenResponsible(model.toJSON());
  }

  async create(data) {
    const created = await KitchenResponsibleModel.create({
      kitchenId: data.kitchenId,
      names: data.names,
      firstLastName: data.firstLastName,
      secondLastName: data.secondLastName,
      email: data.email,
      phoneNumber: data.phoneNumber
    });

    return this._toDomain(created);
  }

  async findByKitchenId(kitchenId) {
    const model = await KitchenResponsibleModel.findOne({
      where: { kitchenId }
    });

    return this._toDomain(model);
  }
}

module.exports = SequelizeKitchenResponsibleRepository;