class ILocationRepository {
  /**
   * Crea una nueva Location en la base de datos.
   * @param {Location} location
   * @returns {Promise<Location>}
   */
  async create(location) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca una Location por su ID.
   * @param {number} id
   * @returns {Promise<Location|null>}
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Devuelve todas las Locations que coinciden con un estado y municipio.
   * @param {number} stateId
   * @param {number} municipalityId
   * @returns {Promise<Location[]>}
   */
  async findByStateAndMunicipality(stateId, municipalityId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ILocationRepository;
