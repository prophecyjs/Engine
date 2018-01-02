class MouseEvent {
  constructor (target) {
    this.target = target
  }

  init () {
    this.target.addEventListener('mousemove');
  }

  mousemove() {

  }
}

module.exports = MouseEvent