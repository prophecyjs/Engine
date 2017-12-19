class Ticker {
  constructor (parent) {
    this.fps = 120
    this.interval = null
    this.parent = parent

    this.started = false
    this.now = null
    this.last = performance.now()
    this.step = 1 / this.fps
    this.fn = null
    this.actualfps = 0

    this.dt = 0

    this.requestId = 0
    this.functions = []

    /**
     * Whether or not this ticker should invoke the method
     * {@link PIXI.ticker.Ticker#start} automatically
     * when a listener is added.
     *
     * @member {boolean}
     * @default false
     */
    this.autoStart = false

    this.tick = () => {
      if (this.started) {
        this.now = performance.now()

        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000)

        while (this.dt > this.step) {
          this.dt = this.dt - this.step
          this.update(this.dt)
          this.actualfps = 1000 / (this.now - this.last)
        }

        if (this.parent) { this.parent.render() }

        this.last = this.now

        this.requestId = requestAnimationFrame(this.tick) // request the next frame
      }
    }
  }

  get isRunning () {
    return (this.requestId)
  }

  update (dt) {
    for (var index in this.functions) {
      this.functions[index](dt)
    }
  }

  setTargetFps (fps) {
    this.fps = fps
    this.step = 1 / this.fps
  }

  getActualFps () {
    return this.actualfps
  }

  add (fn) {
    this.functions.push(fn)

    if (this.autoStart == true) {
      this.start()
    }
    return this
  }

  start () {
    if (this.started == false) {
      this.started = true
      this.tick()
    }
  }

  stop () {
    cancelAnimationFrame(this.requestId)
    this.started = false
  }
}

module.exports = Ticker
