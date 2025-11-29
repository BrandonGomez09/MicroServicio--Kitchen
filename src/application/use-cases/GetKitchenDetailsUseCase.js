class GetKitchenDetailsUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) throw new Error("Kitchen not found");

    return {
      kitchen: {
        id: kitchen.id,
        name: kitchen.name,
        description: kitchen.description,
        ownerId: kitchen.ownerId,
        locationId: kitchen.locationId,
        contactPhone: kitchen.contactPhone,
        contactEmail: kitchen.contactEmail,
        imageUrl: kitchen.imageUrl,
        registrationDate: kitchen.registrationDate,
        approvalStatus: kitchen.approvalStatus,
        approvedBy: kitchen.approvedBy,
        approvalDate: kitchen.approvalDate,
        rejectionReason: kitchen.rejectionReason,
        isActive: kitchen.isActive,
        responsible: kitchen.responsible || null,
        location: kitchen.location || null
      }
    };
  }
}

module.exports = GetKitchenDetailsUseCase;