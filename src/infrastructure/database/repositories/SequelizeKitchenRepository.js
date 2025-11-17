const KitchenModel = require('../models/KitchenModel');
const KitchenResponsibleModel = require('../models/KitchenResponsibleModel');
const LocationModel = require('../models/LocationModel');

const Kitchen = require('../../../domain/entities/Kitchen');

class SequelizeKitchenRepository {
  _toDomain(model) {
    if (!model) return null;

    const json = model.toJSON();

    const responsible = json.responsible
      ? {
          id: json.responsible.id,
          kitchenId: json.responsible.kitchen_id,
          names: json.responsible.names,
          firstLastName: json.responsible.first_last_name,
          secondLastName: json.responsible.second_last_name,
          email: json.responsible.email,
          phoneNumber: json.responsible.phone_number
        }
      : null;

    const location = json.location
      ? {
          id: json.location.id,
          name: json.location.name,
          streetAddress: json.location.street_address,
          neighborhood: json.location.neighborhood,
          stateId: json.location.state_id,
          municipalityId: json.location.municipality_id,
          postalCode: json.location.postal_code,
          capacity: json.location.capacity,
          contactPhone: json.location.contact_phone,
          contactEmail: json.location.contact_email,
          isActive: json.location.is_active
        }
      : null;

    return new Kitchen({
      id: json.id,
      name: json.name,
      description: json.description,
      owner_id: json.owner_id,
      location_id: json.location_id,
      contact_phone: json.contact_phone,
      contact_email: json.contact_email,
      image_url: json.image_url,
      registration_date: json.registration_date,
      approval_status: json.approval_status,
      approved_by: json.approved_by,
      approval_date: json.approval_date,
      rejection_reason: json.rejection_reason,
      is_active: json.is_active,
      responsible,
      location
    });
  }

  async create(data) {
    const newKitchen = await KitchenModel.create({
      name: data.name,
      description: data.description,
      owner_id: data.owner_id || 0,
      location_id: data.location_id,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
      image_url: data.image_url || null,
      approval_status: data.approval_status || 'pending',
      is_active: false
    });

    const created = await KitchenModel.findOne({
      where: { id: newKitchen.id },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return this._toDomain(created);
  }

  async findById(id) {
    const result = await KitchenModel.findOne({
      where: { id },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return this._toDomain(result);
  }

  async update(id, data) {
    await KitchenModel.update(data, { where: { id } });
    return this.findById(id);
  }

  async findPending() {
    const result = await KitchenModel.findAll({
      where: { approval_status: 'pending' },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return result.map(r => this._toDomain(r));
  }

  async findApproved() {
    const result = await KitchenModel.findAll({
      where: { approval_status: 'approved' },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return result.map(r => this._toDomain(r));
  }

  async findRejected() {
    const result = await KitchenModel.findAll({
      where: { approval_status: 'rejected' },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return result.map(r => this._toDomain(r));
  }

  async findByStatus(status) {
    const result = await KitchenModel.findAll({
      where: { approval_status: status },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return result.map(r => this._toDomain(r));
  }

  async findByLocationIds(ids) {
    const result = await KitchenModel.findAll({
      where: {
        location_id: ids,
        approval_status: 'approved',
        is_active: true
      },
      include: [
        { model: KitchenResponsibleModel, as: 'responsible' },
        { model: LocationModel, as: 'location' }
      ]
    });

    return result.map(r => this._toDomain(r));
  }
}

module.exports = SequelizeKitchenRepository;