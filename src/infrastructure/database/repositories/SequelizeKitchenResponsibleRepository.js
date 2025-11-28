const KitchenResponsibleModel = require("../models/KitchenResponsibleModel");

class SequelizeResponsibleRepository {
  async create(data) {
    return await KitchenResponsibleModel.create({
      kitchenId: data.kitchenId,
      names: data.names,
      firstLastName: data.firstLastName,
      secondLastName: data.secondLastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password, 
      userId: data.userId ?? null 
    });
  }

  async findById(id) {
    return await KitchenResponsibleModel.findByPk(id);
  }

  async findByKitchenId(kitchenId) {
    return await KitchenResponsibleModel.findOne({
      where: { kitchenId }
    });
  }

  async update(id, data) {
    await KitchenResponsibleModel.update(data, { where: { id } });
    return await this.findById(id);
  }

  async updateByKitchenId(kitchenId, data) {
    await KitchenResponsibleModel.update(data, { where: { kitchenId } });
    return await this.findByKitchenId(kitchenId);
  }

  async delete(id) {
    return await KitchenResponsibleModel.destroy({
      where: { id }
    });
  }
}

module.exports = SequelizeResponsibleRepository;