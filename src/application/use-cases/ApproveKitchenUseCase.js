const axios = require('axios');

class ApproveKitchenUseCase {
  constructor(kitchenRepository) {
    this.kitchenRepository = kitchenRepository;
  }

  async execute(kitchenId) {
    const kitchen = await this.kitchenRepository.findById(kitchenId);
    if (!kitchen) {
      throw { http_status: 404, message: "Kitchen not found" };
    }

    if (!kitchen.responsible) {
      throw { http_status: 400, message: "Kitchen has no responsible user data" };
    }

    const responsible = kitchen.responsible;

    const payload = {
      names: responsible.names,
      firstLastName: responsible.first_last_name,
      secondLastName: responsible.second_last_name,
      email: responsible.email,
      phoneNumber: responsible.phone_number,
      passwordHash: responsible.password_hash
    };

    let userId = null;

    try {
      // ========== 1. Intentar Crear Usuario ==========
      const response = await axios.post(
        `${process.env.AUTH_USER_SERVICE_URL}/api/v1/auth/register-kitchen-admin`,
        payload
      );

      userId = response.data.data.userId;

      console.log("🟢 Usuario creado para Kitchen Admin:", userId);

    } catch (err) {
      // ========== 2. Si ya existe (409) obtenemos su ID ==========
      if (err.response && err.response.status === 409) {
        console.log("🟡 Usuario ya existe. Recuperando ID…");

        const getUser = await axios.get(
          `${process.env.AUTH_USER_SERVICE_URL}/api/v1/users/by-email/${responsible.email}`
        );

        userId = getUser.data.data.id;

        console.log("🟡 Usuario existente recuperado con ID:", userId);

      } else {
        console.error("❌ Error al registrar Kitchen Admin:", err);
        throw { http_status: 500, message: "Error registering kitchen admin" };
      }
    }

    // ========== 3. Actualizar Cocina ==========
    kitchen.owner_id = userId;
    kitchen.approval_status = "approved";
    kitchen.is_active = true;
    kitchen.approval_date = new Date();

    await this.kitchenRepository.save(kitchen);

    return {
      success: true,
      message: "Kitchen approved successfully",
      data: {
        kitchenId,
        ownerId: userId
      }
    };
  }
}

module.exports = ApproveKitchenUseCase;
