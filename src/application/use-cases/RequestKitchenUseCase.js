const { saveTemporaryPassword } = require("../../infrastructure/store/temp-password.store");

class RequestKitchenUseCase {
  constructor(kitchenRepository, locationRepository, responsibleRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
    this.responsibleRepository = responsibleRepository;
  }

  async execute(dto) {
    const { responsible, kitchen, location } = dto;

    if (!responsible.password) {
      throw { http_status: 400, message: "Password is required" };
    }

    const createdLocation = await this.locationRepository.create(location);

    const createdKitchen = await this.kitchenRepository.create({
      ...kitchen,
      ownerId: 0,
      locationId: createdLocation.id
    });

    await this.responsibleRepository.create({
      kitchenId: createdKitchen.id,
      names: responsible.names,
      firstLastName: responsible.firstLastName,
      secondLastName: responsible.secondLastName,
      email: responsible.email,
      phoneNumber: responsible.phoneNumber
    });

    saveTemporaryPassword(createdKitchen.id, responsible.password);

    return createdKitchen;
  }
}

module.exports = RequestKitchenUseCase;