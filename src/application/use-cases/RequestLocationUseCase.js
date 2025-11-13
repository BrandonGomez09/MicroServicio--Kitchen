// src/application/use-cases/RequestLocationUseCase.js

const Location = require('../../domain/entities/Location');

class RequestLocationUseCase {
  constructor(locationRepository) {
    this.locationRepository = locationRepository;
  }

  async execute(requestData) {
    
    // --- INICIO DE LA CORRECCIÓN ---
    // Mapeamos los datos de 'requestData' (que vienen en snake_case)
    // a las propiedades 'camelCase' que la Entidad 'Location' espera.
    
    const location = new Location({
      name: requestData.name || null, // 'name' viene de KitchenController
      
      // Mapeo de snake_case -> camelCase
      streetAddress: requestData.street_address,
      neighborhood: requestData.neighborhood,
      stateId: requestData.state_id,
      municipalityId: requestData.municipality_id,
      postalCode: requestData.postal_code,
      
      // Mapeo de snake_case -> camelCase
      contactPhone: requestData.contact_phone,
      contactEmail: requestData.contact_email,

      // 'capacity' no está en el constructor de la entidad, 
      // pero lo pasamos por si acaso (no hace daño)
      capacity: requestData.capacity,
    });
    // --- FIN DE LA CORRECCIÓN ---

    const newLocation = await this.locationRepository.create(location);
    return newLocation;
  }
}

module.exports = RequestLocationUseCase;