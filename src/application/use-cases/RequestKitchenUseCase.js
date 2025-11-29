const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);

class RequestKitchenUseCase {
  constructor(kitchenRepository, locationRepository, responsibleRepository) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
    this.responsibleRepository = responsibleRepository;
  }

  async execute(dto) {
    const { kitchen, location, responsible } = dto;

    if (!responsible.password) {
      throw { http_status: 400, message: "Password is required" };
    }

    const encryptedPassword = await bcrypt.hash(responsible.password, SALT_ROUNDS);

    const locationEntity = {
      name: location.neighborhood || location.streetAddress || "Ubicación",
      streetAddress: location.streetAddress,
      neighborhood: location.neighborhood,
      stateId: location.stateId,
      municipalityId: location.municipalityId,
      postalCode: location.postalCode,
      isActive: true
    };

    const createdLocation = await this.locationRepository.create(locationEntity);

    const createdKitchen = await this.kitchenRepository.create({
      name: kitchen.name,
      description: kitchen.description,
      ownerId: 0,
      locationId: createdLocation.id,
      contactPhone: kitchen.contactPhone,
      contactEmail: kitchen.contactEmail,
      imageUrl: kitchen.imageUrl || null
    });

    await this.responsibleRepository.create({
      kitchenId: createdKitchen.id,
      names: responsible.names,
      firstLastName: responsible.firstLastName,
      secondLastName: responsible.secondLastName,
      email: responsible.email,
      phoneNumber: responsible.phoneNumber,
      password: encryptedPassword
    });

    return createdKitchen;
  }
}

module.exports = RequestKitchenUseCase;