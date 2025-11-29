class GetApprovedKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    return await this.kitchenRepository.findByStatus("approved");
  }
}

module.exports = GetApprovedKitchensUseCase;