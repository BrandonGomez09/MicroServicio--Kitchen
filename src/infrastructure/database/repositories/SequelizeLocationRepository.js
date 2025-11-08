const ILocationRepository = require('../../../domain/repositories/ILocationRepository');
const LocationModel = require('../models/LocationModel');
const Location = require('../../../domain/entities/Location');

class SequelizeLocationRepository extends ILocationRepository {
  
  _toDomain(sequelizeLocation) {
    if (!sequelizeLocation) return null;
    return new Location(sequelizeLocation.toJSON());
  }

  async create(locationData) {
    const newLocation = await LocationModel.create({
      name: locationData.name,
      street_address: locationData.street_address,
      neighborhood: locationData.neighborhood,
      state_id: locationData.state_id,
      municipality_id: locationData.municipality_id,
      postal_code: locationData.postal_code,
      capacity: locationData.capacity || null,
      contact_phone: locationData.contact_phone || null,
      contact_email: locationData.contact_email || null,
      is_active: locationData.is_active !== undefined ? locationData.is_active : true,
    });
    return this._toDomain(newLocation);
  }

  async findById(id) {
    const location = await LocationModel.findByPk(id);
    return this._toDomain(location);
  }

  async update(id, locationData) {
    await LocationModel.update(locationData, {
      where: { id: id },
    });
    return this.findById(id);
  }

  async delete(id) {
    const deleted = await LocationModel.destroy({
      where: { id: id },
    });
    return deleted > 0;
  }

  async findAll() {
    const locations = await LocationModel.findAll({
      where: { is_active: true },
    });
    return locations.map(this._toDomain);
  }

  async findByStateAndMunicipality(stateId, municipalityId) {
    const locations = await LocationModel.findAll({
      where: {
        state_id: stateId,
        municipality_id: municipalityId,
        is_active: true,
      },
    });
    return locations.map(this._toDomain);
  }
}

module.exports = SequelizeLocationRepository;