const bcrypt = require('bcrypt');

class RequestKitchenUseCase {
  constructor(kitchenRepository, locationRepository, responsibleRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
    this.responsibleRepository = responsibleRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute({ responsible, kitchen, location }) {

    // 1. Crear ubicación
    const newLocation = await this.locationRepository.create({
      name: kitchen.name,
      street_address: location.streetAddress,
      neighborhood: location.neighborhood,
      state_id: location.stateId,
      municipality_id: location.municipalityId,
      postal_code: location.postalCode,
      contact_phone: kitchen.contactPhone,   // 🔥 CORREGIDO
      contact_email: kitchen.contactEmail,   // 🔥 CORREGIDO
      is_active: true
    });

    // 2. Crear cocina
    const newKitchen = await this.kitchenRepository.create({
      name: kitchen.name,
      description: kitchen.description,
      
      owner_id: 0,                           // 🔥 CORREGIDO (ya no null)
      location_id: newLocation.id,

      contact_phone: kitchen.contactPhone,   // 🔥 CORREGIDO
      contact_email: kitchen.contactEmail,   // 🔥 CORREGIDO

      image_url: kitchen.image_url || null,
      approval_status: 'pending',
      is_active: false
    });

    // 3. Hash password del responsable
    const passwordHash = await bcrypt.hash(responsible.password, 10);

    // 4. Registrar responsable
    await this.responsibleRepository.create({
      kitchen_id: newKitchen.id,
      names: responsible.names,
      first_last_name: responsible.firstLastName,
      second_last_name: responsible.secondLastName,
      email: responsible.email,
      phone_number: responsible.phoneNumber,
      password_hash: passwordHash
    });

    return newKitchen;
  }
}

module.exports = RequestKitchenUseCase;