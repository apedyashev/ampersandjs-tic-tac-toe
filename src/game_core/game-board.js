import $ from 'jquery';
import _ from 'lodash';
import Brush from './brush';

const LTR_DIAG_INDEX = 0,
      RTL_DIAG_INDEX = 1,
      BOARD_DIMENSION_CELLS = 3;

/**
 * Implements game board and handles game logic. It design to be framework-independent and has only two dependencies:
 * jquery and lodash
 */
export default class GameBoard {
    /**
     * Initializes an instance
     * @param {{width: number, height: string, canvasEl: jQuery}} options - config options
     */
    constructor(options) {
        this._options = options;

        const {width} = this._options;
        this._cellSize = width / BOARD_DIMENSION_CELLS;

        // TODO: delete?
        this._boardMatrix = [0, 1, 2].map(() => [null, null, null]);
        this._players = {
            noughts: this._options.noughtsPlayer,
            crosses: this._options.crossesPlayer
        };

        this._crossOutBrush = new Brush();

        this._initPointsArrays();
    }

    /**
     * Resets board matrix to null values, reinits point array and selects the player whose turn is first
     */
    initGame() {
        this._isGameFinished = false;
        this._boardMatrix = [0, 1, 2].map(() => [null, null, null]);

        this._initPointsArrays();
        this._setNextPlayersTurn();
    }

    /**
     * Draws grid, cells and cross-out lines (if somebody won)
     * @param {boolean} forceRedraw - if true, then previously drawn cells will be forsed to drawn. Otherwise it drawns only newly clicked cells
     */
    draw(forceRedraw = false) {
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

    /**
     * Sets width (and height because the board is square) of the board.
     * @param {string} val - new width of the board
     */
    set width(val) {
        this._options.width  = val;
        this._options.height = val;

        this._initCanvas();
    }

    /**
     * Sets noughts player
     * @param {AmpersandPlayer} player -  noughts player
     */
    set noughtsPlayer(player) {
        this._players.noughts = player;
    }

    /**
     * Returns  noughts player
     * @returns {AmpersandPlayer}
     */
    get noughtsPlayer() {
        return this._players.noughts;
    }

    /**
     * Sets crosses player
     * @param {AmpersandPlayer} player -  noughts player
     */
    set crossesPlayer(player) {
        this._players.crosses = player;
    }

    /**
     * Returns  crosses player
     * @returns {AmpersandPlayer}
     */
    get crossesPlayer() {
        return this._players.crosses;
    }

    /**
     * Set new canvas and reinitializes the gameboard with this canvas
     * @param {jQuery} canvas - object returned by jQuery
     */
    set canvas(canvas) {
        this._options.canvasEl = $(canvas);
        this._initCanvas();
        this._attachClickListener();
    }

    /**
     * Attaches listener of click event and does move when a player clicks on the cell
     * @private
     */
    _attachClickListener() {
        $(this._options.canvasEl).off('click').click((event)=> {
            const canvasOffset = $(event.target).offset(),
                mouseX = event.pageX - canvasOffset.left,
                mouseY = event.pageY - canvasOffset.top,
                clickedCell = this._translateMousePosToCellCoordinates(mouseX, mouseY);
            this._doMove(clickedCell);
        });
    }

    /**
     * Initializes canvas and reads canvas 2d context
     * @private
     */
    _initCanvas() {
        const {canvasEl, width, height} = this._options;
        if (width != height) {
            throw new Error('Canvas must be square');
        }
        canvasEl.attr('width', width);
        canvasEl.attr('height', height);

        this._ctx = canvasEl[0].getContext('2d');

        // call with true to force redraw of already drawn cells (forced cells are drawn without animation)
        this.draw(true);
    }

    /**
     * Initializes arrays that store points for each user. There are separate arrays for rows, columns and diagonals.
     * For example, if there are 3 crosses on the 1st row, then this._rowPoints[0].crosses will be se to 3
     * @private
     */
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

    /**
     * Selects the player whose turn is first. If game just started, then the player is selected randomly
     * @private
     */
    _setNextPlayersTurn() {
        const nextPlyerName = this._getNextPlayerName();

        for (let key in this._players) {
            this._players[key].isMyTurn = false;
        }

        this._players[nextPlyerName].isMyTurn = true;
    }

    /**
     * Checks col, row and diags points arrays and crosses out col, row or diag if there is a winner.
     * Player wins if there are 3 points for one of the rows, cols or diags
     * @param {boolean} useAnimation - enables or disables animation when cross-out line is being drawn
     * @private
     */
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

    /**
     * Crosses out a row and sets winner.isWon to true
     * @param {integer} rowIndex - index of the row to be crossed out
     * @param {Player|AmpersandPlayer} winner
     * @param {boolean} useAnimation - enables or disables animation
     * @private
     */
    _crossOutRow(rowIndex, winner, useAnimation = true) {
        const startPoint = this._indecesToCoordinates(rowIndex, 0, 0, this._cellSize / 2),
            endPoint = this._indecesToCoordinates(rowIndex, 2, this._cellSize, this._cellSize / 2);

        winner.isWon = true;
        this._drawCrossOutLine(startPoint, endPoint, winner.brushColor, useAnimation);
    }

    /**
     * Crosses out a column and sets winner.isWon to true
     * @param {integer} colIndex - index of the row to be crossed out
     * @param {Player|AmpersandPlayer} winner
     * @param {boolean} useAnimation - enables or disables animation
     * @private
     */
    _crossOutCol(colIndex, winner, useAnimation = true) {
        const startPoint = this._indecesToCoordinates(0, colIndex, this._cellSize / 2, 0),
            endPoint = this._indecesToCoordinates(2, colIndex, this._cellSize / 2, this._cellSize);

        winner.isWon = true;
        this._drawCrossOutLine(startPoint, endPoint, winner.brushColor, useAnimation);
    }

    /**
     * Crosses out a diagonal and sets winner.isWon to true.
     * @param {integer} diagIndex - index of the row to be crossed out. 0 - top-left to bottom-right. 1 - bottom-left to top-right
     * @param {Player|AmpersandPlayer} winner
     * @param {boolean} useAnimation - enables or disables animation
     * @private
     */
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

    /**
     * Translates row and column index into coordinates on canvas
     * @param {number} rowIndex - row index
     * @param {number} colIndex - column index
     * @param {number} xCorrection - additionaly appended to x coordinate
     * @param {number} yCorrection - additionaly appended to y coordinate
     * @returns {{x: number, y: number}}
     * @private
     */
    _indecesToCoordinates(rowIndex, colIndex, xCorrection = 0, yCorrection = 0) {
        return {
            x: colIndex * this._cellSize + xCorrection,
            y: rowIndex * this._cellSize + yCorrection
        };
    }

    /**
     * Draws cross-out line
     * @param {{x: number, y: number}} startPoint - line's start point
     * @param {{x: number, y: number}} endPoint - line's end point
     * @param {string} brushColor - hex color. E.g '#c0f1c4'
     * @param {boolean} useAnimation - enables or disables animation
     * @private
     */
    _drawCrossOutLine(startPoint, endPoint, brushColor, useAnimation = true) {
        this._crossOutBrush.color = brushColor;
        this._crossOutBrush.drawLine(this._ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, useAnimation);
    }

    /**
     * Writes current player to corresponding cell of boardMatrix (if the cell is empty), updates point arrays, draws the board
     * and select the next player at the end
     * @param {{col: number, row: number}} clickedCell - coordinated of the cell where player clicked
     * @private
     */
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

            // updated point arrays for corresponding player
            this._rowPoints[row][playerName]++;
            this._colPoints[col][playerName]++;
            if (row == col) {
                // left-to-right diagonal
                this._diagPoints[LTR_DIAG_INDEX][playerName]++;
            }
            if ((Math.abs(row - col) == 2) || ((row == 1) && (col == 1))) {
                // right-to-left diagonal
                this._diagPoints[RTL_DIAG_INDEX][playerName]++;
            }
            this.draw();

            // stop changing players if game is finished
            if (!this._isGameFinished) {
                this._setNextPlayersTurn();
            }
        }
    }

    /**
     * Drawns game boards's grid
     * @private
     */
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

    /**
     * Returns either 'noughts' or 'crosses'. If game is just started, then the player is selected randomly
     * @returns {string}
     * @private
     */
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

    /**
     * Translates coordinates of mouse on the canvas to cells row and col indeces
     * @param {number} mouseX
     * @param {number} mouseY
     * @returns {{col: number, row: number}}
     * @private
     */
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
