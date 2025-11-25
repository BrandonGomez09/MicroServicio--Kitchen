const { saveTemporaryPassword } = require("../../infrastructure/store/temp-password.store");

class RequestKitchenUseCase {
  constructor(kitchenRepository, locationRepository, responsibleRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
    this.responsibleRepository = responsibleRepository;
  }

  async execute(data) {
    const { responsible, kitchen, location } = data;

    if (!responsible.password) {
      throw new Error("Password is required for the responsible user.");
    }

    const locationCreated = await this.locationRepository.create(location);

    const kitchenCreated = await this.kitchenRepository.create({
      ...kitchen,
      location_id: locationCreated.id
    });

    await this.responsibleRepository.create({
      kitchen_id: kitchenCreated.id,
      names: responsible.names,
      first_last_name: responsible.firstLastName,
      second_last_name: responsible.secondLastName,
      email: responsible.email,
      phone_number: responsible.phoneNumber
    });

    saveTemporaryPassword(kitchenCreated.id, responsible.password);

    return kitchenCreated;
  }
}

module.exports = RequestKitchenUseCase;