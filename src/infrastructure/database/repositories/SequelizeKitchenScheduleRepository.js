const KitchenScheduleModel = require("../models/KitchenScheduleModel");

class SequelizeKitchenScheduleRepository {
  async create(schedule) {
    return await KitchenScheduleModel.create({
      kitchenId: schedule.kitchenId,
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isActive: true
    });
  }

  async findByKitchenId(kitchenId) {
    return await KitchenScheduleModel.findAll({
      where: { kitchenId }
    });
  }

  async update(kitchenId, data) {
    await KitchenScheduleModel.update(data, { where: { kitchenId } });
    return this.findByKitchenId(kitchenId);
  }

  async deleteByKitchenId(kitchenId) {
    await KitchenScheduleModel.destroy({
      where: { kitchenId }
    });
  }
}

module.exports = SequelizeKitchenScheduleRepository;