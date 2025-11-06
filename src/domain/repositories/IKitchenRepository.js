class IKitchenRepository {
  
  /**
   * Crea una nueva solicitud de cocina
   * @param {Kitchen} kitchenData - Los datos de la cocina
   */
  async create(kitchenData) {
    throw new Error('Método "create" no implementado');
  }

  /**
   * Actualiza una cocina por su ID
   * @param {number} id - El ID de la cocina
   * @param {object} kitchenData - Los datos a actualizar
   */
  async update(id, kitchenData) {
    throw new Error('Método "update" no implementado');
  }

  /**
   * Busca una cocina por su ID
   * @param {number} id 
   */
  async findById(id) {
    throw new Error('Método "findById" no implementado');
  }

  /**
   * Busca todas las cocinas con un estatus específico
   * @param {string} status - ej. 'pending'
   */
  async findByStatus(status) {
    throw new Error('Método "findByStatus" no implementado');
  }

  /**
   * Busca todas las cocinas
   */
  async findAll() {
    throw new Error('Método "findAll" no implementado');
  }
}

module.exports = IKitchenRepository;