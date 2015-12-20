import {Brush} from './brush'

class CrossBrush extends Brush {
    draw(ctx, posX, posY, cellSize) {
        let cellPadding = 15;

        this.drawLine(ctx, posX + cellPadding, posY + cellPadding, posX + cellSize - cellPadding, posY + cellSize - cellPadding, () => {
            this.drawLine(ctx, posX + cellSize - cellPadding, posY + cellPadding, posX + cellPadding, posY + cellSize - cellPadding);
        });
    }
}

export {CrossBrush};
