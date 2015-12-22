import Brush from './brush'
import {Promise} from 'es6-promise'

/**
 * Brush to draw noughts on the game canvas' context
 */
export default class NoughtBrush extends Brush {
    /**
     * Draws nought in the center of given cell
     *
     * @param {native} ctx - canvas 2d context
     * @param {number} cellPosX - X position of top left corner of the cell
     * @param {number} cellPosY - Y position of top left corner of the cell
     * @param {number} cellSize - cell's width (or height, because cell is supposed to be square)
     * @param {boolean} useAnimation - enables or disables animation
     */
    draw(ctx, cellPosX, cellPosY, cellSize, useAnimation = true) {
        const START_ANGLE = -50,
              END_ANGLE   = 315,
              PI_IN_DEGREES = 180,
              TWO_PI_IN_DEGREES = 360,
              // the difference between pen weight on the start and on the end of circle
              PEN_WEIGHT__START_END_DIFF = 10,
              x0 = cellPosX  + (cellSize / 2),
              y0 = cellPosY  + (cellSize / 2),
              fnTimeout = useAnimation ? setTimeout : (fn) => {fn()};
        let radius = (cellSize / 2) - this._cellPadding,
            penWeight = this._initialPenWeight,
            timeoutValue = 100;

        ctx.fillStyle = this._color;

        return new Promise((resolve) => {
            for (let alpha = START_ANGLE; alpha < END_ANGLE; alpha++) {
                (alpha => {
                    fnTimeout(() => {
                        const x = x0 + radius * Math.cos(alpha * Math.PI / PI_IN_DEGREES),
                            y = y0 + radius * Math.sin(alpha * Math.PI / PI_IN_DEGREES);

                        ctx.beginPath();
                        ctx.fillRect(x, y, penWeight, penWeight);
                        ctx.stroke();

                        // we want different pen weight and radius in the start and and pf the circle
                        penWeight += (this._maxPenWeight - this._initialPenWeight) / TWO_PI_IN_DEGREES;
                        radius += PEN_WEIGHT__START_END_DIFF / TWO_PI_IN_DEGREES;
                        if (alpha == (END_ANGLE - 1)) {
                            resolve();
                        }
                    }, timeoutValue++);
                })(alpha);
            }
        });
    }
}

