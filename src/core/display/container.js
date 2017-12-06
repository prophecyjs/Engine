import DisplayObject from './displayobject';

class Container extends DisplayObject {
    constructor() {
        super();
        this._parent = null;
        this.children = [];
    }

    get parent() {
        return this._parerent;
    }

    set parent(parent) {
        this._parent = parent;
    }

    addChild(child) {
        if (!child) {
            return false;
        }

        child._parent = this;
        this.children.push(child);
    }

    _renderCanvas(renderer) {
        // this is where content itself gets rendered...
    }

    renderCanvas(renderer) {
        //if not visible or the alpha is 0 then no need to render this
        if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
            return;
        }

        //
        // if (this._mask)
        // {
        //     renderer.maskManager.pushMask(this._mask);
        // }

        this._renderCanvas(renderer);
        for (let i = 0, j = this.children.length; i < j; ++i) {
            this.children[i].renderCanvas(renderer);
        }

        // if (this._mask)
        // {
        //     renderer.maskManager.popMask(renderer);
        // }
    }

}

module.exports = Container;
