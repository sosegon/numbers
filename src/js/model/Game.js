const { Board } = require('./Board.js');
const { Token } = require('./Token.js');
const { Player } = require('./Player.js');
const { Agent } = require('./Agent.js');
const { updateObjectFromLiteral } = require('./utils.js');
const { GAME_STATUSES, TURNS, PLAYER_DIRECTIONS, GAME_CONTINUITY } = require('./constants.js');

class Game {
    constructor(boardSize) {
        this.createFromScratch(boardSize);
    }
    createFromScratch = (boardSize) => {
        this.token = new Token(boardSize);

        this.board = new Board(boardSize);
        this.board.update(this.token);

        this.player1 = new Player();
        this.player2 = new Agent();

        this.snap = {
            lastValue: 0,
            continuity: GAME_CONTINUITY.CONTINUE,
            turn: TURNS.PLAYER1,
            status: GAME_STATUSES.RESTING
        };
    };
    moveToken = (rowIndex, colIndex) => {
        this.token.moveTo(rowIndex, colIndex);
        // Define the direction for the players
        if (this.player1.direction === PLAYER_DIRECTIONS.NONE || this.player2.direction === PLAYER_DIRECTIONS.NONE) {
            let direction = PLAYER_DIRECTIONS.NONE;

            if (this.token.oldRowIndex === this.token.rowIndex) {
                if (this.snap.turn === TURNS.PLAYER1) {
                    this.player1.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                    this.player2.direction = PLAYER_DIRECTIONS.VERTICAL;
                } else if (this.snap.turn === TURNS.PLAYER2) {
                    this.player1.direction = PLAYER_DIRECTIONS.VERTICAL;
                    this.player2.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                } else {
                    throw new Error("Error setting PLAYER_directions for players");
                }

            } else if (this.token.oldColIndex === this.token.colIndex) {
                if (this.snap.turn === TURNS.PLAYER1) {
                    this.player1.direction = PLAYER_DIRECTIONS.VERTICAL;
                    this.player2.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                } else if (this.snap.turn === TURNS.PLAYER2) {
                    this.player1.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                    this.player2.direction = PLAYER_DIRECTIONS.VERTICAL;
                } else {
                    throw new Error("Error setting PLAYER_directions for players");
                }
            } else {
                throw new Error("Error setting PLAYER_directions for players");
            }
        }
    };
    takeCell = () => {
        this.snap.lastValue = this.board.takeCurrentValue(this.token);
    };
    setStatus = (status) => {
        this.snap.status = status;
    }
    updateBoard = () => {
        this.board.update(this.token);
    };
    updateScores = () => {
        if (this.snap.turn === TURNS.PLAYER1) {
            this.player1.incrementScore(this.snap.lastValue);
        } else if (this.snap.turn === TURNS.PLAYER2) {
            this.player2.incrementScore(this.snap.lastValue);
        } else {
            throw new Error("Error updating scores");
        }
    };
    passToken = () => {
        if (this.snap.turn === TURNS.PLAYER1) {
            this.snap.turn = TURNS.PLAYER2;
        } else if (this.snap.turn === TURNS.PLAYER2) {
            this.snap.turn = TURNS.PLAYER1;
        } else {
            throw new Error("Error passing token");
        }
    };
    updateContinuity = () => {
        if (this.snap.turn === TURNS.PLAYER1) {
            if (!this.board.isNextTurnPossible(this.player1, this.token)) {
                this.snap.continuity = GAME_CONTINUITY.OVER;
            }
        } else if (this.snap.turn === TURNS.PLAYER2) {
            if (!this.board.isNextTurnPossible(this.player2, this.token)) {
                this.snap.continuity = GAME_CONTINUITY.OVER;
            }
        } else {
            throw new Error("Error checking continuity of game");
        }
    };
    getCurrentPlayer = () => {
        if (this.snap.turn === TURNS.PLAYER1) {
            return this.player1;
        } else if (this.snap.turn === TURNS.PLAYER2) {
            return this.player2;
        } else {
            throw new Error("Error getting current player");
        }
    };
    getNextPlayer = () => {
        if (this.snap.turn === TURNS.PLAYER1) {
            return this.player2;
        } else if (this.snap.turn === TURNS.PLAYER2) {
            return this.player1;
        } else {
            throw new Error("Error getting next player");
        }
    };
    serialize = () => {
        return {
            token: this.token.serialize(),
            board: this.board.serialize(),
            player1: this.player1.serialize(),
            player2: this.player2.serialize(),
            snap: this.snap
        };
    };
    updateFromObject = (object) => {
        for (const key of Object.keys(object)) {
            switch (key) {
                case "token":
                    this.token.updateFromObject(object[key]);
                    continue;
                case "board":
                    this.board.updateFromVector(object[key]);
                    continue;
                case "player1":
                    this.player1.updateFromObject(object[key]);
                    continue;
                case "player2":
                    this.player2.updateFromObject(object[key]);
                    continue;
                case "snap":
                    updateObjectFromLiteral(this.snap, object[key]);
                    continue;
                default:
                    continue;
            }
        }
    };
}

module.exports = {
    Game
};