import Brush from './brush'

/**
 * Draws cross on the canvas
 *
 * @implements {Brush}
 */
export default class CrossBrush extends Brush {

    /**
     * Draws cross on the canvas' context
     *
     * @param {native} ctx - canvas 2d context
     * @param {number} posX - x coordinate of the cross' center
     * @param {number} posY - y coordinate of the cross' center
     * @param {number} cellSize - width (and height, because cells are square) of the cell, where cross will be drawn
     * @param {boolean} useAnimation - enables or disables animation
     * @returns {Promise}
     */
    draw(ctx, posX, posY, cellSize, useAnimation = true) {
        const cellPadding = this._cellPadding;

        return this.drawLine(ctx, posX + cellPadding, posY + cellPadding, posX + cellSize - cellPadding, posY + cellSize - cellPadding, useAnimation)
            .then(() => {
                return this.drawLine(ctx, posX + cellSize - cellPadding, posY + cellPadding, posX + cellPadding, posY + cellSize - cellPadding, useAnimation);
            });
    }
}
