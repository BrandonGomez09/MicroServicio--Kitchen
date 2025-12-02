class GetMyKitchenUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw { http_status: 400, message: "User ID is required" };
    }

    const kitchen = await this.kitchenRepository.findByOwnerId(userId);
    
    if (!kitchen) {
      throw { http_status: 404, message: "You do not own any kitchen" };
    }

    return kitchen;
  }
}

module.exports = GetMyKitchenUseCase;