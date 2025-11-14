const Kitchen = require('../models/KitchenModel');
const Location = require('../models/LocationModel');
const KitchenResponsible = require('../models/KitchenResponsibleModel');

class SequelizeKitchenRepository {

  // =======================
  // Obtener cocina por ID
  // =======================
  async findById(id) {
    return await Kitchen.findOne({
      where: { id },
      include: [
        {
          model: KitchenResponsible,
          as: 'responsible',
          attributes: [
            'names',
            'first_last_name',
            'second_last_name',
            'email',
            'phone_number',
            'password_hash'
          ]
        },
        {
          model: Location,
          as: 'location'
        }
      ]
    });
  }

  // =======================
  // Crear cocina
  // =======================
  async create(data) {
    return await Kitchen.create(data);
  }

  // =======================
  // Guardar cambios
  // =======================
  async save(instance) {
    return await instance.save();
  }

  // =======================
  // PENDIENTES
  // =======================
  async findPending() {
    return await Kitchen.findAll({
      where: { approval_status: 'pending' },
      include: [
        {
          model: KitchenResponsible,
          as: 'responsible',
          attributes: [
            'names',
            'first_last_name',
            'second_last_name',
            'email',
            'phone_number'
          ]
        },
        {
          model: Location,
          as: 'location'
        }
      ],
      order: [['id', 'ASC']]
    });
  }

  // =======================
  // APROBADAS
  // =======================
  async findApproved() {
    return await Kitchen.findAll({
      where: { approval_status: 'approved' },
      include: [{ model: Location, as: 'location' }]
    });
  }

  // =======================
  // RECHAZADAS
  // =======================
  async findRejected() {
    return await Kitchen.findAll({
      where: { approval_status: 'rejected' },
      include: [{ model: Location, as: 'location' }]
    });
  }
}

module.exports = SequelizeKitchenRepository;