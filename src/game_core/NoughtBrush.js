import {Brush} from './brush'

/**
 * Brush to draw noughts on the game canvas' context
 */
class NoughtBrush extends Brush {
    /**
     * Draws nought in the center of given cell
     *
     * @param ctx       canvas 2d context
     * @param cellPosX  X position of top left corner of the cell
     * @param cellPosY  Y position of top left corner of the cell
     * @param cellSize  cell's width (or height, because cell is supposed to be square)
     */
    draw(ctx, cellPosX, cellPosY, cellSize, useAnimation = true) {
        const START_ANGLE = -50,
              END_ANGLE   = 315;
        let radius = (cellSize / 2) - 15,
            x0 = cellPosX  + (cellSize / 2),
            y0 = cellPosY  + (cellSize / 2),
            penWeight = 3,
            timeoutValue = 100,
            fnTimeout = useAnimation ? setTimeout : (fn) => {fn()};

        ctx.fillStyle = this._color;

        return new Promise((resolve) => {
            for (var alpha = START_ANGLE; alpha < END_ANGLE; alpha++) {
                (alpha => {
                    fnTimeout(() => {
                        let x = x0 + radius * Math.cos(alpha * Math.PI / 180),
                            y = y0 + radius * Math.sin(alpha * Math.PI / 180);

                        ctx.beginPath();
                        ctx.fillRect(x, y, penWeight, penWeight);
                        ctx.stroke();

                        penWeight += 4 / 360;
                        radius += 10 / 360;
                        if (alpha == (END_ANGLE - 1)) {
                            resolve();
                        }
                    }, timeoutValue++);
                })(alpha);
            }
        });
    }
}

export {NoughtBrush};
