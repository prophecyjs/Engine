class CanvasSpriterRenderer {
    constructor(renderer) {
        this.renderer = renderer;
    }

    render(sprite) {

        if (! sprite.texture.isLoaded) {
            return;
        }

        this.renderer.context.save();

        if (sprite.transform.scale.factor > 0) {
            this.renderer.context.scale(sprite.transform.scale.x, sprite.transform.scale.y);
        }

        // TODO OOP the hell out of this below
        if (sprite.transform.rotation) {
            if (sprite.transform.scale.factor > 0) {
                this.renderer.context.translate((sprite.x + 0.5 * sprite.width) / sprite.transform.scale.factor, (sprite.x + 0.5 * sprite.height) / sprite.transform.scale.factor);
            } else {
                this.renderer.context.translate((sprite.x + 0.5 * sprite.width), (sprite.x + 0.5 * sprite.height));
            }
            this.renderer.context.rotate((Math.PI / 180) * sprite.transform.rotation);
            this.renderer.context.translate(-(sprite.x + 0.5 * sprite.width), -(sprite.x + 0.5 * sprite.height));
        }


        this.renderer.context.drawImage(
            sprite.texture.raw,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height
        );


        this.renderer.context.restore();
    }
}

module.exports = CanvasSpriterRenderer;