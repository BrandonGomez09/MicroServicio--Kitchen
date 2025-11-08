class Location {
  constructor({
    id,
    name,
    street_address,
    neighborhood,
    state_id,
    municipality_id,
    postal_code,
    capacity = null,
    contact_phone = null,
    contact_email = null,
    is_active = true
  }) {
    this.id = id;
    this.name = name;
    this.street_address = street_address;
    this.neighborhood = neighborhood;
    this.state_id = state_id;
    this.municipality_id = municipality_id;
    this.postal_code = postal_code;
    this.capacity = capacity;
    this.contact_phone = contact_phone;
    this.contact_email = contact_email;
    this.is_active = is_active;
  }
}

module.exports = Location;