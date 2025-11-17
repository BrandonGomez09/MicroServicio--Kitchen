class Kitchen {
  constructor({
    id,
    name,
    description,
    ownerId,
    owner_id,
    locationId,
    location_id,
    contactPhone,
    contact_phone,
    contactEmail,
    contact_email,
    imageUrl,
    image_url,
    registrationDate,
    registration_date,
    approvalStatus,
    approval_status,
    approvedBy,
    approved_by,
    approvalDate,
    approval_date,
    rejectionReason,
    rejection_reason,
    isActive,
    is_active,
    responsible = null,
    location = null
  }) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.ownerId = ownerId ?? owner_id ?? 0;
    this.locationId = locationId ?? location_id ?? null;
    this.contactPhone = contactPhone ?? contact_phone ?? null;
    this.contactEmail = contactEmail ?? contact_email ?? null;
    this.imageUrl = imageUrl ?? image_url ?? null;

    this.registrationDate = registrationDate ?? registration_date ?? new Date();
    this.approvalStatus = approvalStatus ?? approval_status ?? 'pending';
    this.approvedBy = approvedBy ?? approved_by ?? null;
    this.approvalDate = approvalDate ?? approval_date ?? null;
    this.rejectionReason = rejectionReason ?? rejection_reason ?? null;
    this.isActive = isActive ?? is_active ?? false;

    this.responsible = responsible;
    this.location = location;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ownerId: this.ownerId,
      locationId: this.locationId,
      contactPhone: this.contactPhone,
      contactEmail: this.contactEmail,
      imageUrl: this.imageUrl,
      registrationDate: this.registrationDate,
      approvalStatus: this.approvalStatus,
      approvedBy: this.approvedBy,
      approvalDate: this.approvalDate,
      rejectionReason: this.rejectionReason,
      isActive: this.isActive,
      responsible: this.responsible,
      location: this.location
    };
  }
}

module.exports = Kitchen;
