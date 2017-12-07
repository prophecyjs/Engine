export default class Transform {
    constructor() {
        this._rotation = 0;
        this.scale = {
            x:0, y:0
        }

    }

    set rotation(deg) {
        this._rotation = deg;
    }

    get rotation() {
        return this._rotation;
    }
}