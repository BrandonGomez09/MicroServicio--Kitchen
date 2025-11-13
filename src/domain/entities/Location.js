// src/domain/entities/Location.js

class Location {
  constructor({ 
    // --- INICIO DE LA CORRECCIÓN ---
    id, // Agregamos 'id' aquí
    // --- FIN DE LA CORRECCIÓN ---

    name, 
    streetAddress, 
    neighborhood, 
    stateId, 
    municipalityId, 
    postalCode, 
    contactPhone, 
    contactEmail, 
    is_active 
  }) {
    
    // --- INICIO DE LA CORRECCIÓN ---
    this.id = id; // Y lo asignamos aquí
    // --- FIN DE LA CORRECCIÓN ---

    this.name = name;
    this.streetAddress = streetAddress;
    this.neighborhood = neighborhood;
    this.stateId = stateId;
    this.municipalityId = municipalityId;
    this.postalCode = postalCode;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
    this.is_active = is_active ?? true;
  }

  toJSON() {
    return {
      // --- INICIO DE LA CORRECCIÓN ---
      id: this.id, // Lo agregamos también al JSON de respuesta
      // --- FIN DE LA CORRECCIÓN ---

      name: this.name,
      streetAddress: this.streetAddress,
      neighborhood: this.neighborhood,
      stateId: this.stateId,
      municipalityId: this.municipalityId,
      postalCode: this.postalCode,
      contactPhone: this.contactPhone,
      contactEmail: this.contactEmail,
      is_active: this.is_active
    };
  }
}

module.exports = Location;