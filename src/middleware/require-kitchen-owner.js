const SequelizeKitchenRepository = require("../infrastructure/database/repositories/SequelizeKitchenRepository");
const kitchenRepository = new SequelizeKitchenRepository();

module.exports = async function requireKitchenOwner(req, res, next) {
  try {
    const userId = req.user.id;
    const kitchenId = req.params.id;

    const kitchen = await kitchenRepository.findById(kitchenId);

    if (!kitchen) {
      return res.status(404).json({
        success: false,
        message: "Kitchen not found"
      });
    }

    if (kitchen.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: This kitchen does not belong to you"
      });
    }

    next();
  } catch (error) {
    console.error("Error in requireKitchenOwner:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
