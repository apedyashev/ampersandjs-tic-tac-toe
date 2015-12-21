import Brush from './brush'

export default class CrossBrush extends Brush {
    draw(ctx, posX, posY, cellSize, useAnimation = true) {
        const cellPadding = this._cellPadding;

        return new Promise(resolve => {
            this.drawLine(ctx, posX + cellPadding, posY + cellPadding, posX + cellSize - cellPadding, posY + cellSize - cellPadding, useAnimation, () => {
                this.drawLine(ctx, posX + cellSize - cellPadding, posY + cellPadding, posX + cellPadding, posY + cellSize - cellPadding, useAnimation, () => {
                    resolve();
                });
            });
        });
    }
}
