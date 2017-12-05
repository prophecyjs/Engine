import DisplayObject from './displayobject';

class Container extends DisplayObject {
    constructor() {
        super();
        this._parent= null;
        this.children = [];
    }

    get parent() {
        return this._parerent;
    }

    set parent(parent) {
        this._parent = parent;
        console.log(parent)
    }

    addChild(child) {
        if (!child) {
            return false;
        }

        child._parent = this;
        this.children.push(child);

    }
}
module.exports = Container;
