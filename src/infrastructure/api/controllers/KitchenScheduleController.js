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
        message: 'Horarios creados correctamente',
        data: schedules
      });
    } catch (err) {
      console.error('❌ Error en create schedule:', err);

      res.status(400).json({
        success: false,
        message: err.message || String(err)
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
        message: 'Horarios actualizados correctamente',
        data: schedules
      });
    } catch (err) {
      console.error('❌ Error en update schedule:', err);

      res.status(400).json({
        success: false,
        message: err.message || String(err)
      });
    }
  }

  async get(req, res) {
    try {
      const kitchenId = req.params.kitchenId;
      const schedules = await getKitchenScheduleUseCase.execute(kitchenId);

      res.status(200).json({ success: true, data: schedules });
    } catch (err) {
      console.error('❌ Error en get schedule:', err);

      res.status(400).json({
        success: false,
        message: err.message || String(err)
      });
    }
  }
}

module.exports = new KitchenScheduleController();