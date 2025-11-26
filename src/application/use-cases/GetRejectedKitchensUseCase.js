class GetRejectedKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    return await this.kitchenRepository.findByStatus("rejected");
  }
}

module.exports = GetRejectedKitchensUseCase;