import $ from 'jquery';
import _ from 'lodash';
import Brush from './brush';

const LTR_DIAG_INDEX = 0,
      RTL_DIAG_INDEX = 1,
      BOARD_DIMENSION_CELLS = 3;

export default class GameBoard {
    constructor(options) {
        this._options = options;

        const {width} = this._options;
        this._cellSize = width / BOARD_DIMENSION_CELLS;

        this._boardMatrix = [0, 1, 2].map(() => [null, null, null]);
        this._players = {
            noughts: this._options.noughtsPlayer,
            crosses: this._options.crossesPlayer
        };

        this._crossOutBrush = new Brush();

        this._initPointsArrays();
    }

    _attachClickListener() {
        $(this._options.canvasEl).off('click').click((event)=> {
            const canvasOffset = $(event.target).offset(),
                mouseX = event.pageX - canvasOffset.left,
                mouseY = event.pageY - canvasOffset.top,
                clickedCell = this._translateMousePosToCellCoordinates(mouseX, mouseY);
            this._doMove(clickedCell);
        });
    }

    _initCanvas() {
        const {canvasEl, width, height} = this._options;
        if (width != height) {
            throw new Error('Canvas must be square');
        }
        canvasEl.attr('width', width);
        canvasEl.attr('height', height);

        this._ctx = canvasEl[0].getContext('2d');

        this.draw(true);
    }

    _initPointsArrays() {
        this._rowPoints = [0, 1, 2].map(() => ({
            'noughts': 0,
            'crosses': 0
        }));
        this._colPoints = [0, 1, 2].map(() => ({
            'noughts': 0,
            'crosses': 0
        }));
        this._diagPoints = [0, 1].map(() => ({
            'noughts': 0,
            'crosses': 0
        }));
    }

    set width(val) {
        this._options.widht  = val;
        this._options.height = val;

        this._initCanvas();
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

    get crossesPlayer() {
        return this._players.crosses;
    }

    initGame() {
        this._isGameFinished = false;
        this._boardMatrix = [0, 1, 2].map(() => [null, null, null]);

        this._initPointsArrays();
        this._setNextPlayersTurn();
    }

    _setNextPlayersTurn() {
        const nextPlyerName = this._getNextPlayerName();

        for (let key in this._players) {
            this._players[key].isMyTurn = false;
        }

        this._players[nextPlyerName].isMyTurn = true;
    }

    draw(forceRedraw) {
        this._drawGrid();

        const {width} = this._options,
            cellSize = width / BOARD_DIMENSION_CELLS,
            alreadyDrawnBrushes = [],
            notDrawnBrushes = [];
        for (let row = 0; row < BOARD_DIMENSION_CELLS; row++) {
            for (let col = 0; col < BOARD_DIMENSION_CELLS; col++) {
                const brushData = this._boardMatrix[row][col],
                    posX = col * cellSize,
                    posY = row * cellSize;
                // Determine cells that have not been drawn yet (basycally only one cell). This cell will be drawn with animation
                if (brushData && !brushData.wasDrawn) {
                    this._boardMatrix[row][col].wasDrawn = true;
                    notDrawnBrushes.push(
                        _.bind(brushData.brush.draw, brushData.brush, this._ctx, posX, posY, cellSize)
                    );
                }
                // Determine cells that have been drawn already. These cells will be drawn WITHOUT animation
                else if (brushData && forceRedraw) {
                    alreadyDrawnBrushes.push(
                        _.bind(brushData.brush.draw, brushData.brush, this._ctx, posX, posY, cellSize, false)
                    );
                }
            }
        }

        if (forceRedraw) {
            alreadyDrawnBrushes.reduce((p, f) => p.then(f), Promise.resolve());
        }
        notDrawnBrushes.reduce((p, f) => p.then(f), Promise.resolve());

        this._crossOutIfWon(!forceRedraw);
    }

    set canvas(canvas) {
        this._options.canvasEl = $(canvas);
        this._initCanvas();
        this._attachClickListener();
    }

    _crossOutIfWon(useAnimation = true) {
        this._rowPoints.forEach((row, rowIndex) => {
            if (row.noughts == BOARD_DIMENSION_CELLS) {
                this._crossOutRow(rowIndex, this._players.noughts, useAnimation);
            }
            if (row.crosses == BOARD_DIMENSION_CELLS) {
                this._crossOutRow(rowIndex, this._players.crosses, useAnimation);
            }
        });

        this._colPoints.forEach((col, colIndex) => {
            if (col.noughts == BOARD_DIMENSION_CELLS) {
                this._crossOutCol(colIndex, this._players.noughts, useAnimation);
            }
            if (col.crosses == BOARD_DIMENSION_CELLS) {
                this._crossOutCol(colIndex, this._players.crosses, useAnimation);
            }
        });

        this._diagPoints.forEach((diag, diagIndex) => {
            if (diag.noughts == BOARD_DIMENSION_CELLS) {
                this._crossOutDiagonal(diagIndex, this._players.noughts, useAnimation);
            }
            if (diag.crosses == BOARD_DIMENSION_CELLS) {
                this._crossOutDiagonal(diagIndex, this._players.crosses, useAnimation);
            }
        });

        if ((this._players.noughts && this._players.noughts.isWon) || (this._players.crosses && this._players.crosses.isWon)) {
            this._isGameFinished = true;
        }
    }

    _crossOutRow(rowIndex, winner) {
        const startPoint = this._indecesToCoordinates(rowIndex, 0, 0, this._cellSize / 2),
            endPoint = this._indecesToCoordinates(rowIndex, 2, this._cellSize, this._cellSize / 2);

        winner.isWon = true;
        this._drawCrossOutLine(startPoint, endPoint, winner.brushColor);
    }

    _crossOutCol(colIndex, winner, useAnimation = true) {
        const startPoint = this._indecesToCoordinates(0, colIndex, this._cellSize / 2, 0),
            endPoint = this._indecesToCoordinates(2, colIndex, this._cellSize / 2, this._cellSize);

        winner.isWon = true;
        this._drawCrossOutLine(startPoint, endPoint, winner.brushColor, useAnimation);
    }

    _crossOutDiagonal(diagIndex, winner, useAnimation) {
        const startPoint = {
                x: (diagIndex === LTR_DIAG_INDEX) ? 0 : this._options.width,
                y: 0
            },
            endPoint = {
                x: (diagIndex === LTR_DIAG_INDEX) ?  this._options.width : 0,
                y: this._options.height
            };
        winner.isWon = true;
        this._drawCrossOutLine(startPoint, endPoint, winner.brushColor, useAnimation);
    }

    _indecesToCoordinates(rowIndex, colIndex, xCorrection = 0, yCorrection = 0) {
        return {
            x: colIndex * this._cellSize + xCorrection,
            y: rowIndex * this._cellSize + yCorrection
        };
    }

    _drawCrossOutLine(startPoint, endPoint, brushColor, useAnimation) {
        this._crossOutBrush.color = brushColor;
        this._crossOutBrush.drawLine(this._ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, useAnimation);
    }

    _doMove(clickedCell) {
        const isGameStarted = this._players.noughts.isInitialized && this._players.crosses.isInitialized;
        if (this._isGameFinished || !isGameStarted) {
            return;
        }

        const {col, row} = clickedCell,
            isCellEmpty = !this._boardMatrix[row][col];

        if (isCellEmpty) {
            const playerName = this._nextPlayerName;
            this._boardMatrix[row][col] = {
                brush: this._players[playerName].brush,
                wasDrawn: false
            };

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

            // stop changing turns if game is finished
            if (!this._isGameFinished) {
                this._setNextPlayersTurn();
            }
        }
    }

    _drawGrid() {
        const {width, height} = this._options,
            cellSize = width / BOARD_DIMENSION_CELLS;
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
        const names = ['noughts', 'crosses'];
        // determine the first-moving player randomly
        if (!this._nextPlayerName) {
            this._nextPlayerName = names[Math.random() < 0.5 ? 0 : 1];
        }
        else {
            if (this._nextPlayerName == names[0]) {
                this._nextPlayerName = names[1];
            }
            else if (this._nextPlayerName == names[1]) {
                this._nextPlayerName = names[0];
            }
            else {
                throw new Error('Unexpected _nextPlayerName: ' + this._nextPlayerName);
            }
        }

        return this._nextPlayerName;
    }

    _translateMousePosToCellCoordinates(mouseX, mouseY) {
        const {width} = this._options,
            cellSize = width / BOARD_DIMENSION_CELLS,
            col = Math.floor(mouseX / cellSize),
            row = Math.floor(mouseY / cellSize);

        return {
            col,
            row
        };
    }
}
