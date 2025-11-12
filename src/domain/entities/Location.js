class Location {
  constructor({ name, streetAddress, neighborhood, stateId, municipalityId, postalCode, contactPhone, contactEmail, is_active }) {
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
