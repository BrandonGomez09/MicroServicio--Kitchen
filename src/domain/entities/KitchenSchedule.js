class KitchenSchedule {
  constructor({
    id,
    kitchenId,
    day,
    startTime,
    endTime
  }) {
    this.id = id;
    this.kitchenId = kitchenId;
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;

    this._validateDay();
    this._validateTime();
  }

  static fromSimplified(kitchenId, payload) {
    const result = [];

    const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    const weekend = ["SATURDAY", "SUNDAY"];

    if (!payload.weekdays || !payload.weekend) {
      throw new Error("Payload must include 'weekdays' and 'weekend'");
    }

    // Weekdays (same schedule)
    for (const day of weekdays) {
      result.push(
        new KitchenSchedule({
          kitchenId,
          day,
          startTime: payload.weekdays.startTime,
          endTime: payload.weekdays.endTime
        })
      );
    }

    // Weekend (same schedule)
    for (const day of weekend) {
      result.push(
        new KitchenSchedule({
          kitchenId,
          day,
          startTime: payload.weekend.startTime,
          endTime: payload.weekend.endTime
        })
      );
    }

    return result;
  }

  _validateDay() {
    const validDays = [
      "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY",
      "SATURDAY", "SUNDAY"
    ];

    if (!validDays.includes(this.day)) {
      throw new Error(`Invalid day '${this.day}'. Must be full uppercase name.`);
    }
  }

  _validateTime() {
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!regex.test(this.startTime) || !regex.test(this.endTime)) {
      throw new Error(`Invalid time format for day ${this.day}. Use HH:MM in 24h format.`);
    }

    if (this.startTime >= this.endTime) {
      throw new Error(`Start time must be earlier than end time for ${this.day}.`);
    }
  }
}

module.exports = KitchenSchedule;
