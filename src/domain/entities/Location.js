class Location {
  constructor({ 
    id, 
    name, 
    streetAddress, 
    neighborhood, 
    stateId, 
    municipalityId, 
    postalCode, 
    is_active 
  }) {
    this.id = id; 
    this.name = name;
    this.streetAddress = streetAddress;
    this.neighborhood = neighborhood;
    this.stateId = stateId;
    this.municipalityId = municipalityId;
    this.postalCode = postalCode;
    this.is_active = is_active ?? true;
  }

  toJSON() {
    return {
      id: this.id, 
      name: this.name,
      streetAddress: this.streetAddress,
      neighborhood: this.neighborhood,
      stateId: this.stateId,
      municipalityId: this.municipalityId,
      postalCode: this.postalCode,
      is_active: this.is_active
    };
  }
}

module.exports = Location;
