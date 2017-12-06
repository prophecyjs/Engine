import Container from '../display/Container';


class Sprite extends Container {
    constructor(src) {
        super();

        this.texture = {
            raw: new Image()
        };

        this.texture.raw.src= src;
        this.texture.raw.onload = () => {
            this.width = this.texture.raw.width;
            this.height = this.texture.raw.height;
        }

        this.pluginName = 'sprite';
    }

    _renderCanvas(renderer)
    {
        renderer.plugins[this.pluginName].render(this);
    }
}
module.exports = Sprite;