const Location = require('../../domain/entities/Location');

class RequestLocationUseCase {
  constructor(locationRepository) {
    this.locationRepository = locationRepository;
  }

  async execute(requestData) {
    const location = new Location({
      name: null, 
      street_address: requestData.street_address,
      neighborhood: requestData.neighborhood,
      state_id: requestData.state_id,
      municipality_id: requestData.municipality_id,
      postal_code: requestData.postal_code,
      capacity: requestData.capacity,
      contact_phone: requestData.contact_phone,
      contact_email: requestData.contact_email,
    });

    const newLocation = await this.locationRepository.create(location);
    return newLocation;
  }
}

module.exports = RequestLocationUseCase;