class CanvasSpriterRenderer {
    constructor(renderer) {
        this.renderer = renderer;
    }

    render(sprite) {
        this.renderer.context.drawImage(
            sprite.texture.raw,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height
        );
    }
}
module.exports = CanvasSpriterRenderer;