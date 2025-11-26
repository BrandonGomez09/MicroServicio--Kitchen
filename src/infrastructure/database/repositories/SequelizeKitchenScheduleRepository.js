const KitchenScheduleModel = require("../models/KitchenScheduleModel");
const KitchenSchedule = require("../../../domain/entities/KitchenSchedule");

class SequelizeKitchenScheduleRepository {
  _toDomain(model) {
    if (!model) return null;
    return new KitchenSchedule(model.toJSON());
  }

  async create(schedule) {
    const created = await KitchenScheduleModel.create({
      kitchenId: schedule.kitchenId,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime
    });

    return this._toDomain(created);
  }

  async findByKitchenId(kitchenId) {
    const rows = await KitchenScheduleModel.findAll({ where: { kitchenId } });
    return rows.map(r => this._toDomain(r));
  }

  async deleteByKitchenId(kitchenId) {
    await KitchenScheduleModel.destroy({ where: { kitchenId } });
  }
}

module.exports = SequelizeKitchenScheduleRepository;