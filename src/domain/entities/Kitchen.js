class Kitchen {
  constructor({
    id,
    name,
    description,
    ownerId,
    locationId,
    contactPhone,
    contactEmail,
    imageUrl,
    registrationDate,
    approvalStatus,
    approvedBy,
    approvalDate,
    rejectionReason,
    isActive,
    responsible = null,
    location = null,
    schedules = []
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ownerId = ownerId ?? 0;
    this.locationId = locationId ?? null;
    this.contactPhone = contactPhone ?? null;
    this.contactEmail = contactEmail ?? null;
    this.imageUrl = imageUrl ?? null;
    this.registrationDate = registrationDate ?? new Date();
    this.approvalStatus = approvalStatus ?? "pending";
    this.approvedBy = approvedBy ?? null;
    this.approvalDate = approvalDate ?? null;
    this.rejectionReason = rejectionReason ?? null;
    this.isActive = isActive ?? false;

    this.responsible = responsible;
    this.location = location;
    this.schedules = schedules;   
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
      location: this.location,
      schedules: this.schedules    
    };
  }
}

module.exports = Kitchen;