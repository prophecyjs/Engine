import Container from '../display/Container';
import Texture from '../textures/Texture';

class Sprite extends Container {
    constructor(src) {
        super();

        this.texture = new Texture(src);
        this.pluginName = 'sprite';

        console.log('done')
    }

    _renderCanvas(renderer) {
        renderer.plugins[this.pluginName].render(this);
    }

    _onTextureUpdate(texture) {
        this.width = texture.width;
        this.height = texture.height;
    }

    get texture() {
        return this._texture;
    }

    set texture(value) {
        if (this._texture === value) {
            return;
        }

        this._texture = value;

        if (value) {
            // wait for the texture to load
            if (value.isLoaded) {
                this._onTextureUpdate();
            }
            else {
                value.once('update', this._onTextureUpdate, this);
            }
        }

    }
}

module.exports = Sprite;