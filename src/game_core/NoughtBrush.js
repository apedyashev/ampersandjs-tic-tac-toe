import {Brush} from './Brush';

class NoughtBrush extends Brush {

    draw(ctx, posX, posY, cellSize) {
        ctx.beginPath();
        ctx.arc(posX  + (cellSize / 2), posY  + (cellSize / 2), cellSize / 2, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}

export {NoughtBrush};
