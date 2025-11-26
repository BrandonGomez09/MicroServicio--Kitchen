const LocationModel = require("../models/LocationModel");
const Location = require("../../../domain/entities/Location");

class SequelizeLocationRepository {
  _toDomain(model) {
    if (!model) return null;
    return new Location(model.toJSON());
  }

  async create(data) {
    const newLocation = await LocationModel.create({
      streetAddress: data.streetAddress,
      neighborhood: data.neighborhood,
      stateId: data.stateId,
      municipalityId: data.municipalityId,
      postalCode: data.postalCode
    });

    return this._toDomain(newLocation);
  }

  async findById(id) {
    const model = await LocationModel.findByPk(id);
    return this._toDomain(model);
  }

  async findByStateAndMunicipality(stateId, municipalityId) {
    const models = await LocationModel.findAll({
      where: { stateId, municipalityId, isActive: true }
    });

    return models.map(m => this._toDomain(m));
  }
}

module.exports = SequelizeLocationRepository;