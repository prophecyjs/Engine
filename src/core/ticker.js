class Ticker {
    constructor(parent) {
        this.fps = 120;
        this.interval = null;
        this.parent = parent;

        this.started = false;
        this.now = null;
        this.last = performance.now();
        this.step = 1 / this.fps;
        this.fn = null;
        this.actualfps = 0;

        this.dt = 0;

        this.requestId = 0;

        this.tick = () => {
            if (this.started) {
                this.now = performance.now();

                this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);

                while (this.dt > this.step) {
                    this.dt = this.dt - this.step;
                    this.update(this.step);
                    this.actualfps = 1000 / (this.now - this.last);

                }


                this.parent.render();
                this.last = this.now;


                this.requestId = requestAnimationFrame(this.tick); // request the next frame
            }
        }
    }

    update() {
        this.fn();
    }

    setTargetFps(fps) {
        this.fps = fps;
        this.step = 1 / this.fps;
    }

    getActualFps() {
        return this.actualfps;
    }

    add(fn) {
        this.fn = fn;
        this.start();
    }

    start() {
        this.started = true;
        this.tick();
    }

    stop() {
        cancelAnimationFrame(this.requestId);
        this.started = false;
    }
}

module.exports = Ticker;
