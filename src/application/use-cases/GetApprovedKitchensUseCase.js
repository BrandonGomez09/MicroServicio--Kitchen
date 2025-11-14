class GetApprovedKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    const approvedKitchens = await this.kitchenRepository.findByStatus('approved');
    return approvedKitchens;
  }
}

module.exports = GetApprovedKitchensUseCase;