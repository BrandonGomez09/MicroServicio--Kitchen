class Kitchen {
  constructor({
    id,
    name,
    description,
    owner_id,
    location_id,
    contact_phone,
    contact_email,
    image_url = null,
    registration_date,
    approval_status = 'pending', // Valor por defecto
    approved_by = null,
    approval_date = null,
    rejection_reason = null,
    is_active = false            // Valor por defecto
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.owner_id = owner_id;
    this.location_id = location_id;
    this.contact_phone = contact_phone;
    this.contact_email = contact_email;
    this.image_url = image_url;
    this.registration_date = registration_date || new Date(); // Fecha actual si no se provee
    this.approval_status = approval_status;
    this.approved_by = approved_by;
    this.approval_date = approval_date;
    this.rejection_reason = rejection_reason;
    this.is_active = is_active;
  }
}

module.exports = Kitchen;