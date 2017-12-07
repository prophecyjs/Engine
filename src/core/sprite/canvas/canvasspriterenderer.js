class CanvasSpriterRenderer {
    constructor(renderer) {
        this.renderer = renderer;
    }

    render(sprite) {

        this.renderer.context.save();


        if (sprite.transform.scale.x || sprite.transform.scale.y) {
            this.renderer.context.scale(sprite.transform.scale.x, sprite.transform.scale.y);

        }

        if (sprite.transform.rotation)
        {
            this.renderer.context.translate(sprite.x + 0.5 * sprite.width, sprite.x + 0.5 * sprite.height);
            this.renderer.context.rotate((Math.PI/180) * sprite.transform.rotation);
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