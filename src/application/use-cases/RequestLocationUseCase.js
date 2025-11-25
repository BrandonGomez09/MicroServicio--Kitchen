const Location = require('../../domain/entities/Location');

class RequestLocationUseCase {
  constructor(locationRepository) {
    this.locationRepository = locationRepository;
  }

  async execute(data) {
    const location = new Location({
      name: data.neighborhood || data.name || 'Ubicación',
      streetAddress: data.streetAddress,
      neighborhood: data.neighborhood,
      stateId: data.stateId,
      municipalityId: data.municipalityId,
      postalCode: data.postalCode,
      is_active: true
    });

    const newLocation = await this.locationRepository.create(location);
    return newLocation;
  }
}

module.exports = RequestLocationUseCase;