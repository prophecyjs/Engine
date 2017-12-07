export default class Transform {
    constructor() {
        this._rotation = 0;
        this._scale = {
            x:0, y:0, factor: 0,
        }
    }

    set scale(scale) {
        var x = (1 * scale);
        this._scale.x =  x;
        this._scale.y =  x;
        this.scale.factor = x;
    }

    get scale() {
        return this._scale;
    }

    set rotation(deg) {
        this._rotation = deg;
    }

    get rotation() {
        return this._rotation;
    }
}