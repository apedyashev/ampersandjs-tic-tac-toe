import {Promise} from 'es6-promise'

/**
 * Class which implemets drawing on a canvas.
 * It supposed to be used as a base class to for classes that implement drawing of crosses or noughts
 *
 * @interface
 */
export default class Brush {
    /**
     * Initializes the brush with color
     *
     * @param {string} color - hex value of brush color
     */
    constructor(color = '#990000') {
        this._color = color;
        this._cellPadding = 15;
        this._initialPenWeight = 3;
        this._maxPenWeight = 7;
    }

    /**
     * Drawing function that must be implemented in derived class
     *
     * @throws {Error}
     */
    draw() {
        throw new Error('Brush::draw must be implemented in derived class');
    }

    /**
     * Draws line on the canvas using animation (can be disabled)
     * @param {native} ctx - 2d context of canvas
     * @param {number} startX - x position of starting point
     * @param {number} startY - y position of starting point
     * @param {number} endX - x position of end point
     * @param {number} endY - y position of end point
     * @param {boolean} useAnimation - turns animation on or off
     *
     * @returns {Promise}
     */
    drawLine(ctx, startX, startY, endX, endY, useAnimation = true) {
        return new Promise((resolve) => {
            const k = (endY - startY) / (endX - startX),
                b = startY - k * startX,
                minX = Math.min(startX, endX),
                maxX = Math.max(startX, endX),
                // setImmediate is not crossbrowser, so use simple function that calls callback
                fnTimeout = useAnimation ? setTimeout : (fn) => {fn()};
            let penWeight = 7,
                timeoutValue = 100;

            ctx.fillStyle = this._color;

            if (startX == endX) {
                // draw vertical line without using a formula (because there is division by zero when k is being calculated
                // for the formula y = kx + b )
                const minY = Math.min(startY, endY),
                      maxY = Math.max(startY, endY);

                for (let y = minY; y <= maxY; y++) {
                    (y => {
                        fnTimeout(() => {
                            ctx.beginPath();
                            ctx.fillRect(startX, y, penWeight, penWeight);
                            ctx.stroke();
                            // we want different pen weight in the start and and of the line
                            penWeight -= (this._maxPenWeight - this._initialPenWeight) / (maxY - minY);
                            if (y == maxY) {
                                resolve();
                            }
                        }, timeoutValue++);
                    })(y);
                }
            }
            else {
                // draw line using  formula y = kx + b
                for (let x = minX; x <= maxX; x++) {
                    (x => {
                        fnTimeout(() => {
                            const y = k * x + b;
                            ctx.beginPath();
                            ctx.fillRect(x, y, penWeight, penWeight);
                            ctx.stroke();
                            // we want different pen weight in the start and and of the line
                            penWeight -= (this._maxPenWeight - this._initialPenWeight) / (maxX - minX);
                            if (x == maxX) {
                                resolve();
                            }
                        }, timeoutValue++);
                    })(x);
                }
            }
        });
    }

    /**
     * Sets color of the brush
     * @param {string} val - Hex value of color. E.g '#fcf'
     */
    set color(val) {
        this._color = val;
    }

    /**
     * Returns color of the brush
     * @returns {string}
     */
    get color() {
        return this._color;
    }
}
