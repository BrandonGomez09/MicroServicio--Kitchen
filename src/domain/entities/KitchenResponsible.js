class KitchenResponsible {
  constructor(data) {
    this.id = data.id;
    this.kitchenId = data.kitchenId ?? data.kitchen_id;
    this.names = data.names;
    this.firstLastName = data.firstLastName ?? data.first_last_name;
    this.secondLastName = data.secondLastName ?? data.second_last_name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber ?? data.phone_number;
    this.password = data.password ?? null;

    this.createdAt = data.createdAt ?? data.created_at ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      kitchenId: this.kitchenId,
      names: this.names,
      firstLastName: this.firstLastName,
      secondLastName: this.secondLastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      createdAt: this.createdAt
    };
  }
}

module.exports = KitchenResponsible;