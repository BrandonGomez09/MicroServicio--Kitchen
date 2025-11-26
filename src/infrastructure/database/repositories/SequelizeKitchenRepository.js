const KitchenModel = require("../models/KitchenModel");
const KitchenResponsibleModel = require("../models/KitchenResponsibleModel");
const LocationModel = require("../models/LocationModel");

const Kitchen = require("../../../domain/entities/Kitchen");

class SequelizeKitchenRepository {
  _toDomain(model) {
    if (!model) return null;
    const json = model.toJSON();
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

      ownerId: data.ownerId,

      locationId: data.locationId,

      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      imageUrl: data.imageUrl ?? null
    });

    return this._toDomain(newKitchen);
  }

  async findById(id) {
    const result = await KitchenModel.findOne({
      where: { id },
      include: [
        { model: KitchenResponsibleModel, as: "responsible" },
        { model: LocationModel, as: "location" }
      ]
    });

    return this._toDomain(result);
  }

  async update(id, data) {
    await KitchenModel.update(data, { where: { id } });
    return this.findById(id);
  }

  async findPending() {
    return (
      await KitchenModel.findAll({
        where: { approvalStatus: "pending" },
        include: [
          { model: KitchenResponsibleModel, as: "responsible" },
          { model: LocationModel, as: "location" }
        ]
      })
    ).map(m => this._toDomain(m));
  }

  async findApproved() {
    return (
      await KitchenModel.findAll({
        where: { approvalStatus: "approved" },
        include: [
          { model: KitchenResponsibleModel, as: "responsible" },
          { model: LocationModel, as: "location" }
        ]
      })
    ).map(m => this._toDomain(m));
  }

  async findRejected() {
    return (
      await KitchenModel.findAll({
        where: { approvalStatus: "rejected" },
        include: [
          { model: KitchenResponsibleModel, as: "responsible" },
          { model: LocationModel, as: "location" }
        ]
      })
    ).map(m => this._toDomain(m));
  }

  async findByLocationIds(ids) {
    return (
      await KitchenModel.findAll({
        where: { locationId: ids },
        include: [{ model: LocationModel, as: "location" }]
      })
    ).map(m => this._toDomain(m));
  }
}

module.exports = SequelizeKitchenRepository;
