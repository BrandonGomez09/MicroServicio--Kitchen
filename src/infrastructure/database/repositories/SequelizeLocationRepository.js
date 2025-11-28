const LocationModel = require("../models/LocationModel");

class SequelizeLocationRepository {
  async create(locationEntity) {
    return await LocationModel.create({
      name: locationEntity.name || "Ubicación sin nombre",
      streetAddress: locationEntity.streetAddress,
      neighborhood: locationEntity.neighborhood,
      stateId: locationEntity.stateId,
      municipalityId: locationEntity.municipalityId,
      postalCode: locationEntity.postalCode,
      isActive: locationEntity.isActive
    });
  }

  async findById(id) {
    return await LocationModel.findByPk(id);
  }

  async update(id, data) {
    await LocationModel.update(data, { where: { id } });
    return await this.findById(id);
  }

  async findByStateAndMunicipality(stateId, municipalityId) {
    return await LocationModel.findAll({
      where: { stateId, municipalityId }
    });
  }
}

module.exports = SequelizeLocationRepository; 