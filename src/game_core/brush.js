class Brush {
    constructor(color = '#990000') {
        this._color = color;
    }

    drawLine(ctx, startX, startY, endX, endY, useAnimation = true, cbDone = null) {
        console.log(startX, startY, endX, endY, useAnimation, cbDone);
        let k = (endY - startY) / (endX - startX),
            b = startY - k * startX,
            minX = Math.min(startX, endX),
            maxX = Math.max(startX, endX),
            penWeight = 7,
            timeoutValue = 100,
            fnTimeout = useAnimation ? setTimeout : (fn) => {fn()};

        ctx.fillStyle = this._color;

        if (startX == endX) {
            // draw vertical line without using a formula
            let minY = Math.min(startY, endY),
                maxY = Math.max(startY, endY);

            for (let y = minY; y <= maxY; y++) {
                (y => {
                    fnTimeout(() => {
                        ctx.beginPath();
                        ctx.fillRect(startX, y, penWeight, penWeight);
                        ctx.stroke();
                        penWeight -= 4 / (maxY - minY);
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
                        let y = k * x + b;
                        ctx.beginPath();
                        ctx.fillRect(x, y, penWeight, penWeight);
                        ctx.stroke();
                        penWeight -= 4 / (maxX - minX);
                        console.log('cbDone', cbDone, x, maxX);
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

export {Brush}
