const KitchenMembershipModel = require('../models/KitchenMembershipModel');
const KitchenModel = require('../models/KitchenModel');
const LocationModel = require('../models/LocationModel');
const KitchenMembership = require('../../../domain/entities/KitchenMembership');
const Kitchen = require('../../../domain/entities/Kitchen');

class SequelizeKitchenMembershipRepository {
  
  _toDomain(model) {
    if (!model) return null;
    const entity = new KitchenMembership(model.toJSON());

    if (model.kitchen) {
      entity.kitchen = new Kitchen(model.kitchen.toJSON());
    }
    
    return entity;
  }

  async create(data) {
    const newMembership = await KitchenMembershipModel.create({
      kitchenId: data.kitchenId,
      userId: data.userId,
      isActive: true
    });
    return this._toDomain(newMembership);
  }

  async findByKitchenId(kitchenId) {
    const results = await KitchenMembershipModel.findAll({
      where: { kitchenId, isActive: true }
    });
    return results.map(r => this._toDomain(r));
  }

  async findByUserId(userId) {
    const results = await KitchenMembershipModel.findAll({
      where: { userId, isActive: true },
      include: [
        {
          model: KitchenModel,
          as: 'kitchen',
          include: [{ model: LocationModel, as: 'location' }] 
        }
      ]
    });
    return results.map(r => this._toDomain(r));
  }

  async findByUserAndKitchen(userId, kitchenId) {
    const result = await KitchenMembershipModel.findOne({
      where: { userId, kitchenId }
    });
    return this._toDomain(result);
  }
}

module.exports = SequelizeKitchenMembershipRepository;