const KitchenScheduleModel = require('../models/KitchenScheduleModel');
const KitchenSchedule = require('../../../domain/entities/KitchenSchedule');

class SequelizeKitchenScheduleRepository {
  _toDomain(model) {
    if (!model) return null;
    return new KitchenSchedule(model.toJSON());
  }

  async create(schedule) {
    const newRow = await KitchenScheduleModel.create({
      kitchen_id: schedule.kitchenId,
      day: schedule.day,
      start_time: schedule.startTime,
      end_time: schedule.endTime
    });

    return this._toDomain(newRow);
  }

  async findByKitchenId(kitchenId) {
    const rows = await KitchenScheduleModel.findAll({
      where: { kitchen_id: kitchenId }
    });

    return rows.map(r => this._toDomain(r));
  }

  async deleteByKitchenId(kitchenId) {
    await KitchenScheduleModel.destroy({
      where: { kitchen_id: kitchenId }
    });
  }
}

module.exports = SequelizeKitchenScheduleRepository;
