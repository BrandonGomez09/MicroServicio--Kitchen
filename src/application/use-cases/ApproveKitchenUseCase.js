class ApproveKitchenUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId, adminUserId) {
    // 1. Verificamos si la cocina existe (opcional pero recomendado)
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw new Error('Cocina no encontrada');
    }

    // 2. Preparamos los datos a actualizar
    const dataToUpdate = {
      approval_status: 'approved',
      approval_date: new Date(),
      is_active: true, // Al aprobarla, la activamos
      approved_by: adminUserId, // Guardamos qué admin la aprobó
      rejection_reason: null, // Limpiamos por si fue rechazada antes
    };

    // 3. Usamos el repositorio para actualizar la BD
    const updatedKitchen = await this.kitchenRepository.update(
      kitchenId,
      dataToUpdate
    );
    return updatedKitchen;
  }
}

module.exports = ApproveKitchenUseCase;