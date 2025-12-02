class KitchenMembership {
  constructor({
    id,
    kitchenId,
    userId,
    joinDate,
    isActive
  }) {
    this.id = id;
    this.kitchenId = kitchenId;
    this.userId = userId;
    this.joinDate = joinDate || new Date();
    this.isActive = isActive !== undefined ? isActive : true;
  }

  toJSON() {
    return {
      id: this.id,
      kitchenId: this.kitchenId,
      userId: this.userId,
      joinDate: this.joinDate,
      isActive: this.isActive
    };
  }
}

module.exports = KitchenMembership;