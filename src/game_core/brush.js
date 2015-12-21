export default class Brush {
    constructor(color = '#990000') {
        this._color = color;
        this._cellPadding = 15;
        this._initialPenWeight = 3;
        this._maxPenWeight = 7;
    }

    drawLine(ctx, startX, startY, endX, endY, useAnimation = true, cbDone = null) {
        const   k = (endY - startY) / (endX - startX),
                b = startY - k * startX,
                minX = Math.min(startX, endX),
                maxX = Math.max(startX, endX),
                fnTimeout = useAnimation ? setTimeout : (fn) => {fn()};
        let penWeight = 7,
            timeoutValue = 100;

        ctx.fillStyle = this._color;

        if (startX == endX) {
            // draw vertical line without using a formula
            const minY = Math.min(startY, endY),
                maxY = Math.max(startY, endY);

            for (let y = minY; y <= maxY; y++) {
                (y => {
                    fnTimeout(() => {
                        ctx.beginPath();
                        ctx.fillRect(startX, y, penWeight, penWeight);
                        ctx.stroke();
                        penWeight -= (this._maxPenWeight - this._initialPenWeight) / (maxY - minY);
                        if (cbDone && (y == maxY)) {
                            cbDone();
                        }
                    }, timeoutValue++);
                })(y);
            }
        }
        else {
            for (let x = minX; x <= maxX; x++) {
                (x => {
                    fnTimeout(() => {
                        const y = k * x + b;
                        ctx.beginPath();
                        ctx.fillRect(x, y, penWeight, penWeight);
                        ctx.stroke();
                        penWeight -= (this._maxPenWeight - this._initialPenWeight) / (maxX - minX);
                        if (cbDone && (x == maxX)) {
                            cbDone();
                        }
                    }, timeoutValue++);
                })(x);
            }
        }
    }

    set color(val) {
        this._color = val;
    }

    get color() {
        return this._color;
    }
}
