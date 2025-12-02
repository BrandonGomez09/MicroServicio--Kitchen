class SubscribeToKitchenUseCase {
  constructor(membershipRepository, kitchenRepository) {
    this.membershipRepository = membershipRepository;
    this.kitchenRepository = kitchenRepository;
  }

  async execute(userId, kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    const existing = await this.membershipRepository.findByUserAndKitchen(userId, kitchenId);
    if (existing && existing.isActive) {
      throw { http_status: 400, message: "User is already subscribed to this kitchen" };
    }

    return await this.membershipRepository.create({
      userId,
      kitchenId
    });
  }
}

module.exports = SubscribeToKitchenUseCase;