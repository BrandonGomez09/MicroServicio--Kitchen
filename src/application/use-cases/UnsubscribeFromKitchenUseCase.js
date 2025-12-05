class UnsubscribeFromKitchenUseCase {
  constructor(membershipRepository, kitchenRepository) {
    this.membershipRepository = membershipRepository;
    this.kitchenRepository = kitchenRepository;
  }

  async execute(userId, kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    const deleted = await this.membershipRepository.delete(userId, kitchenId);

    if (!deleted) {
      throw { http_status: 404, message: "Subscription not found or user was not subscribed" };
    }

    return { success: true, message: "Unsubscribed successfully from kitchen" };
  }
}

module.exports = UnsubscribeFromKitchenUseCase;