const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);

const KitchenEventFactory = require("../../domain/events/KitchenEventFactory");

class RequestKitchenUseCase {
  constructor(kitchenRepository, locationRepository, responsibleRepository, eventPublisher) {
    this.kitchenRepository = kitchenRepository;
    this.locationRepository = locationRepository;
    this.responsibleRepository = responsibleRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(dto) {
    const { kitchen, location, responsible } = dto;

    if (!responsible.password) {
      throw { http_status: 400, message: "Password is required" };
    }

    const encryptedPassword = await bcrypt.hash(responsible.password, SALT_ROUNDS);

    const createdLocation = await this.locationRepository.create({
      name: location.neighborhood || location.streetAddress || "Ubicación",
      streetAddress: location.streetAddress,
      neighborhood: location.neighborhood,
      stateId: location.stateId,
      municipalityId: location.municipalityId,
      postalCode: location.postalCode,
      isActive: true,
    });

    const createdKitchen = await this.kitchenRepository.create({
      name: kitchen.name,
      description: kitchen.description,
      ownerId: 0,
      locationId: createdLocation.id,
      contactPhone: kitchen.contactPhone,
      contactEmail: kitchen.contactEmail,
      imageUrl: kitchen.imageUrl || null,
    });

    const createdResponsible = await this.responsibleRepository.create({
      kitchenId: createdKitchen.id,
      names: responsible.names,
      firstLastName: responsible.firstLastName,
      secondLastName: responsible.secondLastName,
      email: responsible.email,
      phoneNumber: responsible.phoneNumber,
      password: encryptedPassword,
    });

    const event = KitchenEventFactory.createPendingEvent(
      createdKitchen,
      createdResponsible
    );

    await this.eventPublisher.publish(event.routingKey, event.payload);

    console.log("📤 [Kitchen] Event emitted:", event.routingKey, event.payload);

    return {
      success: true,
      message: "Kitchen requested successfully",
      kitchenId: createdKitchen.id,
    };
  }
}

module.exports = RequestKitchenUseCase;