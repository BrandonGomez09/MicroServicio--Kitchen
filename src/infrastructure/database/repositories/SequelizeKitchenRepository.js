const IKitchenRepository = require('../../../domain/repositories/IKitchenRepository');
const KitchenModel = require('../models/KitchenModel');
const Kitchen = require('../../../domain/entities/Kitchen');

// Esta clase implementa la "interfaz"
class SequelizeKitchenRepository extends IKitchenRepository {
  
  // Mapeador: Convierte un objeto de Sequelize a nuestra entidad de Dominio
  _toDomain(sequelizeKitchen) {
    if (!sequelizeKitchen) return null;
    return new Kitchen(sequelizeKitchen.toJSON());
  }

  async create(kitchenData) {
    // kitchenData es una instancia de nuestra entidad Kitchen
    // Usamos .toJSON() si es una clase, o solo kitchenData si es un objeto simple
    const newKitchen = await KitchenModel.create({
        name: kitchenData.name,
        description: kitchenData.description,
        owner_id: kitchenData.owner_id,
        location_id: kitchenData.location_id,
        contact_phone: kitchenData.contact_phone,
        contact_email: kitchenData.contact_email,
        approval_status: 'pending', // Aseguramos el estado inicial
        is_active: false,
        registration_date: new Date()
    });
    return this._toDomain(newKitchen);
  }

  async update(id, kitchenData) {
    // kitchenData es un objeto simple, ej: { approval_status: 'approved', approved_by: 1 }
    await KitchenModel.update(kitchenData, {
      where: { id: id },
    });
    // Después de actualizar, buscamos el registro completo y lo devolvemos
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
    // Convertimos cada resultado de Sequelize a nuestra entidad de Dominio
    return kitchens.map(this._toDomain);
  }

  async findAll() {
    const kitchens = await KitchenModel.findAll();
    return kitchens.map(this._toDomain);
  }
}

module.exports = SequelizeKitchenRepository;