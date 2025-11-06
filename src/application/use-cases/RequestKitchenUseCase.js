const Kitchen = require('../../domain/entities/Kitchen');

class RequestKitchenUseCase {
  // 1. Recibimos el "contrato" del repositorio
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  // 2. El método "execute" es el que hace el trabajo
  async execute(requestData) {
    // requestData es un objeto simple que viene del controlador
    // ej: { name: '...', description: '...', owner_id: 1, ... }

    // 3. Creamos una entidad de dominio (aplicamos reglas de negocio)
    const kitchen = new Kitchen({
      ...requestData,
      approval_status: 'pending', // Aseguramos el estado inicial
      is_active: false,
      registration_date: new Date(),
    });

    // 4. Usamos el repositorio para guardar en la BD
    const newKitchen = await this.kitchenRepository.create(kitchen);
    return newKitchen;
  }
}

module.exports = RequestKitchenUseCase;