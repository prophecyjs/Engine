class MouseInteraction {
  constructor (target, callback) {
    this.target = target
    this.callback = callback

    this.mouseclick = this.mouseclick.bind(this)
    this.mousemove = this.mousemove.bind(this)

    this.target.addEventListener('click', this.mouseclick, true)
    // this.target.addEventListener('mousemove', this.mousemove, true)
  }

  reportback (event) {
    if (typeof this.callback == 'function') {
      this.callback(event)
    }
  }

  mouseclick (event) {
    this.reportback(event)
  }

  mousemove (event) {
    this.reportback(event)
  }
}

module.exports = MouseInteraction