const LocationModel = require('../models/LocationModel');
const Location = require('../../../domain/entities/Location');

class SequelizeLocationRepository {

  _toDomain(sequelizeLocation) {
    if (!sequelizeLocation) return null;
    return new Location(sequelizeLocation.toJSON());
  }

  async create(locationData) {
  // Si el objeto es una instancia de la clase Location del dominio,
  // convertimos sus propiedades a JSON plano:
  if (typeof locationData.toJSON === 'function') {
    locationData = locationData.toJSON();
  }

  console.log('📍 Datos recibidos en create(Location):', locationData);

  const newLocation = await LocationModel.create({
    name: locationData.name || locationData.neighborhood || 'Ubicación sin nombre',
    street_address: locationData.streetAddress || locationData.street_address,
    neighborhood: locationData.neighborhood,
    state_id: locationData.stateId || locationData.state_id,
    municipality_id: locationData.municipalityId || locationData.municipality_id,
    postal_code: locationData.postalCode || locationData.postal_code,
    contact_phone: locationData.contactPhone || locationData.contact_phone || null,
    contact_email: locationData.contactEmail || locationData.contact_email || null,
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
      where: { id },
    });
    return this.findById(id);
  }

  async delete(id) {
    const deleted = await LocationModel.destroy({
      where: { id },
    });
    return deleted > 0;
  }

  async findAll() {
    const locations = await LocationModel.findAll({
      where: { is_active: true },
    });
    return locations.map((loc) => this._toDomain(loc));
  }

  async findByStateAndMunicipality(stateId, municipalityId) {
    const locations = await LocationModel.findAll({
      where: {
        state_id: stateId,
        municipality_id: municipalityId,
        is_active: true,
      },
    });
    return locations.map((loc) => this._toDomain(loc));
  }
}

module.exports = SequelizeLocationRepository;