import {Brush} from './Brush';

class CrossBrush extends Brush {
    draw(ctx, posX, posY, cellSize) {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(posX + cellSize, posY + cellSize);
        ctx.moveTo(posX + cellSize, posY);
        ctx.lineTo(posX, posY + cellSize);
        ctx.closePath();
        ctx.stroke();
    }
}

export {CrossBrush};
