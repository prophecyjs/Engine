import {shared} from "../core/ticker";
import Container from '../core/display/Container';

/**
 * A SpriteSheetAnimation will animate a spritesheet.
 *
 * {% sample lang="js" -%}
 * ```bash
 * $ npm install gitbook-api
 * ```
 *
 * ```js
 * // in this case the font is in a file called 'desyrel.fnt'
 * let bitmapText = new PIXI.extras.BitmapText("text using a fancy font!", {font: "35px Desyrel", align: "right"});
 * ```
 *
 * http://www.angelcode.com/products/bmfont/ for windows or
 * http://www.bmglyph.com/ for mac.
 *
 * @class py.extras.SpriteSheetAnimation
 * @extends py.Container
 * @memberof py.extras
 */
class SpriteSheetAnimation extends Container {
    constructor() {
        super();
        this.animationframes = [];
        this.ticker = shared;
        this.ticker.autoStart = false;
        this._speed = 0;
        this.ticks = 0;
        this.currentFrame = -1;
        this.frames = {
            current: null,
            last: null,
        }

    }

    /**
     * Set the number of ticks per frame.
     *
     * @param {number} speed
     */
    set speed(speed) {
        this._speed = speed / 1000;
    }

    _update(delta) {

        if (this.ticks < this._speed) {
            this.ticks += delta;
        } else {

            this.currentFrame++;

            if (this.currentFrame === this.animationframes.length) {
                this.currentFrame = 0;
            }

            if (this.animationframes.length > 1) {
                this.frames.current = this.animationframes[this.currentFrame];

                if (this.currentFrame == 0) {
                    this.frames.last = this.animationframes[this.animationframes.length - 1];
                } else {
                    this.frames.last = this.animationframes[this.currentFrame - 1];
                }

            } else {
                this.frames.current = this.animationframes[this.currentFrame];
                this.frames.last = null;
            }

            this.frames.current.visible = true;

            if (this.frames.last) {
                this.frames.last.visible = false;
            }

            this.ticks = 0;
        }

    }

    /**
     * Set the number of ticks per frame.
     *
     * @param {Sprite} frame Add a sprite to this animation
     */
    addFrame(frame) {
        frame.x = this.x;
        frame.y = this.y;
        frame.visible = false;

        this.animationframes.push(frame);
        this.addChild(frame);
    }

    /**
     * Play the animation
     */
    play() {
        this.ticker.add((delta) => {
            this._update(delta);
        })
        this.ticker.start();
    }

    /**
     * Pauze the animation
     */
    pauze() {
        this.ticker.stop();
    }
}

module.exports = SpriteSheetAnimation;