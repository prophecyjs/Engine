class DisplayObject {
    constructor() {
        this.alpha = 1;
        this.visible = true;
        this.renderable = true;
        this.parent = null;
        this.filterArea = null;

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}

module.exports = DisplayObject;
