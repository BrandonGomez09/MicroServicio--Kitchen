class GetPendingKitchensUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute() {
    // 1. Llama al repositorio y pide solo las 'pending'
    const pendingKitchens = await this.kitchenRepository.findByStatus('pending');
    return pendingKitchens;
  }
}

module.exports = GetPendingKitchensUseCase;