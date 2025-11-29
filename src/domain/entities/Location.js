class Location {
  constructor({
    id,
    name,
    streetAddress,
    neighborhood,
    stateId,
    municipalityId,
    postalCode,
    isActive
  }) {
    this.id = id;
    this.name = name || neighborhood || "Ubicación sin nombre";
    this.streetAddress = streetAddress;
    this.neighborhood = neighborhood;
    this.stateId = stateId;
    this.municipalityId = municipalityId;
    this.postalCode = postalCode;
    this.isActive = isActive ?? true;
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
      isActive: this.isActive
    };
  }
}

module.exports = Location;