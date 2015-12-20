/**
 * Brush to draw noughts on the game canvas' context
 */
class NoughtBrush {
    constructor(color = '#990000') {
        this._color = color;
    }

    /**
     * Draws nought in the center of given cell
     *
     * @param ctx       canvas 2d context
     * @param cellPosX  X position of top left corner of the cell
     * @param cellPosY  Y position of top left corner of the cell
     * @param cellSize  cell's width (or height, because cell is supposed to be square)
     */
    draw(ctx, cellPosX, cellPosY, cellSize) {
        let radius = (cellSize / 2) - 15,
            x0 = cellPosX  + (cellSize / 2),
            y0 = cellPosY  + (cellSize / 2),
            penWeight = 3;

        ctx.fillStyle = this._color;

        var timeoutValue = 100;
        for(var alpha = -50; alpha < 315; alpha++) {
            (alpha => {
                setTimeout(() => {
                    let x = x0 + radius * Math.cos(alpha * Math.PI / 180),
                        y = y0 + radius * Math.sin(alpha * Math.PI / 180);

                    ctx.beginPath();
                    ctx.fillRect(x, y, penWeight, penWeight);
                    ctx.stroke();

                    penWeight += 4 / 360;
                    radius += 10 / 360;
                }, timeoutValue++);
            })(alpha);
        }
    }
}

export {NoughtBrush};
