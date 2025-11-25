const LocationModel = require('../models/LocationModel');
const Location = require('../../../domain/entities/Location');

class SequelizeLocationRepository {

  _toDomain(model) {
    if (!model) return null;
    return new Location(model.toJSON());
  }

  async create(locationData) {
    console.log("📍 Datos recibidos en create(Location):", locationData);

    const newLocation = await LocationModel.create({
      name: locationData.name || locationData.neighborhood || 'Ubicación sin nombre',
      street_address: locationData.streetAddress,
      neighborhood: locationData.neighborhood,
      state_id: locationData.stateId,
      municipality_id: locationData.municipalityId,
      postal_code: locationData.postalCode,
      is_active: true
    });

    return this._toDomain(newLocation);
  }

  async findById(id) {
    const record = await LocationModel.findByPk(id);
    return this._toDomain(record);
  }

  async findByStateAndMunicipality(stateId, municipalityId) {
    const results = await LocationModel.findAll({
      where: {
        state_id: stateId,
        municipality_id: municipalityId,
        is_active: true
      }
    });

    return results.map(r => this._toDomain(r));
  }
}

module.exports = SequelizeLocationRepository;