import AnchorPoint from '../display/AnchorPoint';
import Container from '../display/Container';
import Texture from '../textures/Texture';

class Sprite extends Container {
    constructor(data) {
        super();

        this.anchor = new AnchorPoint();

        if (typeof data == 'object') {
            this.texture = texture;
        } else {
            this.texture = new Texture(data);
        }
        this.pluginName = 'sprite';
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