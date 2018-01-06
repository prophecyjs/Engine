class InteractionEvent {
  constructor (event) {
    this.originalEvent = event
    this.target = null;
    this.point = null;
    this.x = 0;
    this.y = 0;
  }

}

module.exports = InteractionEvent