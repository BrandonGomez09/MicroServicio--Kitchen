const KitchenModel = require('../models/KitchenModel');
const KitchenResponsibleModel = require('../models/KitchenResponsibleModel');
const LocationModel = require('../models/LocationModel');

const Kitchen = require('../../../domain/entities/Kitchen');

class SequelizeKitchenRepository {

  _toDomain(model) {
    if (!model) return null;

    const json = model.toJSON();

    if (json.responsible) {
      delete json.responsible.password;
    }

    return new Kitchen({
      ...json,
      responsible: json.responsible || null,
      location: json.location || null
    });
  }

  async create(data) {
    const newKitchen = await KitchenModel.create({
      name: data.name,
      description: data.description,
      ownerId: data.ownerId ?? 0,
      locationId: data.locationId,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      imageUrl: data.imageUrl ?? null,
      approvalStatus: 'pending',
      isActive: false
    });

    return this._toDomain(newKitchen);
  }

  async findById(id) {
    const result = await KitchenModel.findOne({
      where: { id },
      include: [
        { model: KitchenResponsibleModel, as: "responsible", attributes: { exclude: ["password"] }},
        { model: LocationModel, as: "location" }
      ]
    });

    return this._toDomain(result);
  }

  async update(id, data) {
    await KitchenModel.update(data, { where: { id } });
    return this.findById(id);
  }

  async findByStatus(status) {
    const result = await KitchenModel.findAll({
      where: { approvalStatus: status },
      include: [
        { model: KitchenResponsibleModel, as: "responsible", attributes: { exclude: ["password"] }},
        { model: LocationModel, as: "location" }
      ]
    });

    return result.map(r => this._toDomain(r));
  }

  async findPending() {
    return this.findByStatus("pending");
  }

  async findApproved() {
    return this.findByStatus("approved");
  }

  async findRejected() {
    return this.findByStatus("rejected");
  }

  async findByLocationIds(stateId, municipalityId) {
    const result = await KitchenModel.findAll({
      include: [
        { model: LocationModel, as: "location", where: { stateId, municipalityId }},
        { model: KitchenResponsibleModel, as: "responsible", attributes: { exclude: ["password"] }}
      ]
    });

    return result.map(r => this._toDomain(r));
  }
}

module.exports = SequelizeKitchenRepository;