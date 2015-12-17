let $ = require('jquery');

const LTR_DIAG_INDEX = 0,
      RTL_DIAG_INDEX = 1;

class GameBoard {
    constructor(options) {

        this._options = options;

        let {width} = this._options;
        this._cellSize = width / 3;

        this._boardMatrix = [0, 1, 2].map(x => [null, null, null]);
        this._players = {
            noughts: this._options.noughtsPlayer,
            crosses: this._options.crossesPlayer
        };

        this._initPointsArrays();
    }

    _attachClickListener() {
        $(this._options.canvasEl).off('click').click((event)=> {
            let canvasOffset = $(event.target).offset(),
                mouseX = event.pageX - canvasOffset.left,
                mouseY = event.pageY - canvasOffset.top;

            let clickedCell = this._translateMousePosToCellCoordinates(mouseX, mouseY);
            this._doMove(clickedCell);
        });
    }

    _initCanvas() {
        let {canvasEl, width, height} = this._options;
        if (width != height) {
            throw new Error('Canvas must be square');
        }
        canvasEl.attr('width', width);
        canvasEl.attr('height', height);

        this._ctx = canvasEl[0].getContext('2d');

        this.draw();
    }

    _initPointsArrays() {
        this._rowPoints = [0, 1, 2].map(x => ({
            'noughts': 0,
            'crosses': 0
        }));
        this._colPoints = [0, 1, 2].map(x => ({
            'noughts': 0,
            'crosses': 0
        }));
        this._diagPoints = [0, 1].map(x => ({
            'noughts': 0,
            'crosses': 0
        }));
    }

    set noughtsPlayer(player) {
        this._players.noughts = player;
    }

    get noughtsPlayer() {
        return this._players.noughts;
    }

    set crossesPlayer(player) {
        this._players.crosses = player;
    }

    init() {
        this._setNextPlayersTurn();
    }

    _setNextPlayersTurn() {
        // TODO
        let nextPlyerName = this._getNextPlayerName();

        for(let key in this._players) {
            this._players[key].isMyTurn = false;
        }

        this._players[nextPlyerName].isMyTurn = true;
    }

    draw(context) {
        this._drawGrid();

        let {width, height} = this._options,
            cellSize = width / 3;
        for(let row = 0; row < 3; row++) {
            for(let col = 0; col < 3; col++) {
                let cellBrush = this._boardMatrix[row][col];
                if (cellBrush) {
                    let posX = col * cellSize,
                        posY = row * cellSize;
                    cellBrush.draw(this._ctx, posX, posY, cellSize);
                }
            }
        }

        this._crossOutIfWon();
    }

    set canvas(canvas) {
        this._options.canvasEl = $(canvas);
        this._initCanvas();
        this._attachClickListener();
    }

    _crossOutIfWon() {
        this._rowPoints.forEach((row, rowIndex) => {
            if (row.noughts == 3) {
                console.log(`noughts won at row ${rowIndex}`);
                this._crossOutRow(rowIndex);
                this._players.noughts.isWon = true;
            }
            if (row.crosses == 3) {
                console.log(`crosses won at row ${rowIndex}`);
                this._crossOutRow(rowIndex);
                this._players.crosses.isWon = true;
            }
        });

        this._colPoints.forEach((col, colIndex) => {
            if (col.noughts == 3) {
                console.log(`noughts won at col ${colIndex}`);
                this._crossOutCol(colIndex);
                this._players.noughts.isWon = true;
            }
            if (col.crosses == 3) {
                console.log(`crosses won at col ${colIndex}`);
                this._crossOutCol(colIndex);
                this._players.crosses.isWon = true;
            }
        });

        this._diagPoints.forEach((diag, diagIndex) => {
            if (diag.noughts == 3) {
                console.log(`noughts won at diag ${diagIndex}`);
                this._crossOutDiagonal(diagIndex);
                this._players.noughts.isWon = true;
            }
            if (diag.crosses == 3) {
                console.log(`crosses won at diag ${diagIndex}`);
                this._crossOutDiagonal(diagIndex);
                this._players.crosses.isWon = true;
            }
        });
    }

    _crossOutRow(rowIndex) {
        let startPoint = this._indecesToCoordinates(rowIndex, 0, 0, this._cellSize / 2),
            endPoint = this._indecesToCoordinates(rowIndex, 2, this._cellSize, this._cellSize / 2);

        this._drawCrossOutLine(startPoint, endPoint);
    }

    _crossOutCol(colIndex) {
        let startPoint = this._indecesToCoordinates(0, colIndex, this._cellSize / 2, 0),
            endPoint = this._indecesToCoordinates(2, colIndex, this._cellSize / 2, this._cellSize);

        this._drawCrossOutLine(startPoint, endPoint);
    }

    _crossOutDiagonal(diagIndex) {
        let startPoint = {
                x: (diagIndex === LTR_DIAG_INDEX) ? 0 : this._options.width,
                y: 0
            },
            endPoint = {
                x: (diagIndex === LTR_DIAG_INDEX) ?  this._options.width : 0,
                y:  this._options.height
            };
        this._drawCrossOutLine(startPoint, endPoint);
    }

    _indecesToCoordinates(rowIndex, colIndex, xCorrection = 0, yCorrection = 0) {
        return {
            x: colIndex * this._cellSize + xCorrection,
            y: rowIndex * this._cellSize + yCorrection
        };
    }

    _drawCrossOutLine(startPoint, endPoint) {
        this._ctx.beginPath();
        this._ctx.moveTo(startPoint.x, startPoint.y);
        this._ctx.lineTo(endPoint.x, endPoint.y);
        this._ctx.closePath();
        this._ctx.stroke();
    }

    _doMove(clickedCell) {
        let {col, row} = clickedCell,
            isCellEmpty = !this._boardMatrix[row][col];

        if (isCellEmpty) {
            let playerName = this._nextPlayerName;
            this._boardMatrix[row][col] = this._players[playerName].brush;

            this._rowPoints[row][playerName]++;
            this._colPoints[col][playerName]++;
            if (row == col) {
                // left-to-right diagonal
                this._diagPoints[0][playerName]++;
            }
            if ((Math.abs(row - col) == 2) || ((row == 1) && (col == 1))) {
                // right-to-left diagonal
                this._diagPoints[1][playerName]++;
            }
            this.draw();

            this._setNextPlayersTurn();
        }
    }

    _drawGrid() {
        let {width, height} = this._options,
            cellSize = width / 3;
        this._ctx.strokeRect(0, 0, width, height);

        // draw vertical lines
        for (let x = cellSize; x < width; x += cellSize) {
            this._ctx.beginPath();
            this._ctx.moveTo(x, 0);
            this._ctx.lineTo(x, height);
            this._ctx.closePath();
            this._ctx.stroke();
        }

        // draw horizontal lines
        for (let y = cellSize; y < width; y += cellSize) {
            this._ctx.beginPath();
            this._ctx.moveTo(0, y);
            this._ctx.lineTo(width, y);
            this._ctx.closePath();
            this._ctx.stroke();
        }
    }

    _getNextPlayerName() {
        let names = ['noughts', 'crosses'];
        if (!this._nextPlayerName) {
            this._nextPlayerName = names[Math.random() < 0.5 ? 0 : 1];
        }
        else {
            if (this._nextPlayerName == names[0]) {
                this._nextPlayerName = names[1];
            }
            else if(this._nextPlayerName == names[1]){
                this._nextPlayerName = names[0];
            }
            else {
                throw new Error('Unexpected _nextPlayerName: ' + this._nextPlayerName);
            }
        }

        return this._nextPlayerName;
    }

    _translateMousePosToCellCoordinates(mouseX, mouseY) {
        let {width} = this._options,
            cellSize = width / 3,
            col = Math.floor(mouseX / cellSize),
            row = Math.floor(mouseY / cellSize);

        return {
            col,
            row
        };
    }
}

export {GameBoard}
