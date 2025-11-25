class ILocationRepository {

  async create(location) {
    throw new Error('Method not implemented');
  }

  async update(id, locationData) {
    throw new Error("Method 'update' not implemented");
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByStateAndMunicipality(stateId, municipalityId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ILocationRepository;
