class RejectKitchenUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId, reason, adminUserId) {
    // 1. Verificamos si la cocina existe
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw new Error('Cocina no encontrada');
    }

    // 2. Preparamos los datos a actualizar
    const dataToUpdate = {
      approval_status: 'rejected',
      is_active: false, // La cocina no estará activa
      rejection_reason: reason, // Guardamos el motivo del rechazo
      approval_date: null, // Limpiamos estos campos
      approved_by: null,
    };

    // 3. Usamos el repositorio para actualizar la BD
    const updatedKitchen = await this.kitchenRepository.update(
      kitchenId,
      dataToUpdate
    );
    return updatedKitchen;
  }
}

module.exports = RejectKitchenUseCase;