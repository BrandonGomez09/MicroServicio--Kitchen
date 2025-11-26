class KitchenResponsible {
  constructor({
    id,
    kitchenId,
    names,
    firstLastName,
    secondLastName,
    email,
    phoneNumber,
    createdAt,
    password 
  }) {
    this.id = id;
    this.kitchenId = kitchenId;
    this.names = names;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt ?? new Date();
    this.password = password ?? null;
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
      createdAt: this.createdAt,
      password: this.password 
    };
  }
}

module.exports = KitchenResponsible;
