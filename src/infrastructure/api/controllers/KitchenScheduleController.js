const {
  createKitchenScheduleUseCase,
  updateKitchenScheduleUseCase,
  getKitchenScheduleUseCase
} = require('../dependencies/dependencies');

class KitchenScheduleController {
  async create(req, res) {
    try {
      const kitchenId = req.params.kitchenId;

      const schedules = await createKitchenScheduleUseCase.execute(
        kitchenId,
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Horarios creados correctamente",
        data: schedules
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async update(req, res) {
    try {
      const kitchenId = req.params.kitchenId;

      const schedules = await updateKitchenScheduleUseCase.execute(
        kitchenId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Horarios actualizados correctamente",
        data: schedules
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async get(req, res) {
    try {
      const kitchenId = req.params.kitchenId;
      const schedules = await getKitchenScheduleUseCase.execute(kitchenId);

      res.status(200).json({ success: true, data: schedules });

    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new KitchenScheduleController();