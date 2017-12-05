class Renderer {
    constructor(size, options) {
        var canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        this.width = size.width;
        this.height = size.height;
        this.ctx = canvas.getContext('2d');
        this.view = canvas;

        Object.assign(this.view.style, options);
    }

    render(displayobject) {
        console.log(displayobject);
    }

    Clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
module.exports = Renderer;
