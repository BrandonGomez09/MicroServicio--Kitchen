const SequelizeKitchenRepository = require("../infrastructure/database/repositories/SequelizeKitchenRepository");
const kitchenRepository = new SequelizeKitchenRepository();

module.exports = async function (req, res, next) {
  try {
    const kitchenId = req.params.kitchenId || req.params.id;
    console.log("📌 [requireKitchenOwner] PARAM kitchenId:", kitchenId);

    if (!kitchenId) {
      return res.status(400).json({
        success: false,
        message: "Missing kitchenId parameter"
      });
    }

    console.log("📌 [requireKitchenOwner] User:", req.user);

    // Super_admin puede pasar
    if (req.user.roles.includes("Super_admin")) {
      console.log("✔ Super_admin detected → allowing");
      return next();
    }

    // Solo Admin_cocina puede pasar
    if (!req.user.roles.includes("Admin_cocina")) {
      console.log("❌ User is NOT Admin_cocina");
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions"
      });
    }

    // Traer cocina real desde DB
    const kitchen = await kitchenRepository.findById(kitchenId);
    console.log("📌 [requireKitchenOwner] Kitchen found:", kitchen);

    if (!kitchen) {
      console.log("❌ Kitchen not found");
      return res.status(404).json({
        success: false,
        message: "Kitchen not found"
      });
    }

    console.log("📌 [requireKitchenOwner] kitchen.ownerId:", kitchen.ownerId);
    console.log("📌 [requireKitchenOwner] req.user.id:", req.user.id);

    // 🔥 ESTA ES LA VALIDACIÓN CORRECTA
    if (req.user.id !== Number(kitchen.ownerId)) {
      console.log("❌ [requireKitchenOwner] User is NOT the owner");
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this kitchen"
      });
    }

    console.log("✔ [requireKitchenOwner] OWNER VERIFIED");
    next();
  } catch (err) {
    console.error("❌ Error in requireKitchenOwner:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};