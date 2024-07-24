class EventEmitter {
  constructor() {
    this.events = {};
  }

  sub(type, event) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(event);
  }

  pub(type) {
    const events = this.events[type] || [];
    events.forEach(event => event && event());
  }

  unsub(type, event) {
    this.events[type] = this.events[type] || [];
    this.events[type] = this.events[type].filter(evt => evt !== event);
  }
}
