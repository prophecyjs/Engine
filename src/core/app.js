import Renderer from 'core/renderer';
import Ticker from 'core/ticker/ticker';
import Container from 'core/display/container';


class App {
    constructor(size, options) {
        this.size = size;

        this.options = options = Object.assign({
            autoStart: true,
        }, options);

        this._renderer = new Renderer(size, options); // should be auto desiding ..
        this._ticker = new Ticker(this);
        this._stage = new Container();

        this._stage.parent = this;

        if (options.autoStart) {
            this.start();
        }

    }

    get ticker() {
        return this._ticker;
    }

    get renderer() {
        return this._renderer;
    }

    get stage() {
        return this._stage;
    }

    get screen() {
        return this.size;
    }

    get view() {
        return this._renderer.view;
    }

    render() {
        this.renderer.render(this._stage);
    }

    stop() {
        this._ticker.stop();
    }

    start() {
        this._ticker.start();
    }

}

Object.assign(py, {
    App: App,
});