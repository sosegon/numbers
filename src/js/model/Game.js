const { Board } = require('@model/Board');
const { Token } = require('@model/Token');
const { Player } = require('@model/Player');
const { Agent } = require('@model/Agent');
const { updateObjectFromLiteral } = require('@model/utils');
const { GAME_STATUSES, TURNS, PLAYER_DIRECTIONS, GAME_CONTINUITY } = require('@model/flags');

/**
 * Class representing a game. A game is made of a {@link Board} a
 * {@link Token} and 2 {@link Player}s, one of them is an {@link Agent}.
 */
class Game {
    /**
     * Create a Game.
     *
     * @param {number} boardSize - Defines a square {@link Board}.
     */
    constructor(boardSize) {
        this.updateFromScratch(boardSize);
    }
    /**
     * Update the game given the size of the board.
     *
     * @param {number} boardSize - Defines a square {@link Board}.
     */
    updateFromScratch(boardSize) {
        this.token = new Token(boardSize);

        this.board = new Board(boardSize);
        this.board.updateCellsByToken(this.token);

        this.player1 = new Player();
        this.player2 = new Agent();

        this.snap = {
            lastValue: 0,
            continuity: GAME_CONTINUITY.CONTINUE,
            turn: TURNS.PLAYER1,
            status: GAME_STATUSES.RESTING,
        };
    }
    /**
     * Move the {@link Token} to the given position. If the {@link Player}s'
     * directions have not been set yet, the function defines them.
     *
     * In the following board, the token is located at position `[3, 3]`
     *
     * ```
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * ```
     *
     * When the directions are not set yet, the {@link Player} that makes the first move
     * can move the {@link Token} along its row or column.
     *
     * If the move is along the row,
     * the direction of the {@link Player} is set to **HORIZONTAL**; therefore, the
     * direction of the other {@link Player} is set to **VERTICAL**.
     *
     * If the move is along the column,
     * the direction of the {@link Player} is set to **VERTICAL**; therefore, the
     * direction of the other {@link Player} is set to **HORIZONTAL**.
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     */
    moveToken(rowIndex, colIndex) {
        this.token.moveTo(rowIndex, colIndex);
        // Define the direction for the players
        if (
            this.player1.direction === PLAYER_DIRECTIONS.NONE ||
            this.player2.direction === PLAYER_DIRECTIONS.NONE
        ) {
            let direction = PLAYER_DIRECTIONS.NONE;

            if (this.token.oldRowIndex === this.token.rowIndex) {
                if (this.snap.turn === TURNS.PLAYER1) {
                    this.player1.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                    this.player2.direction = PLAYER_DIRECTIONS.VERTICAL;
                } else if (this.snap.turn === TURNS.PLAYER2) {
                    this.player1.direction = PLAYER_DIRECTIONS.VERTICAL;
                    this.player2.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                } else {
                    throw new Error('Error setting PLAYER_directions for players');
                }
            } else if (this.token.oldColIndex === this.token.colIndex) {
                if (this.snap.turn === TURNS.PLAYER1) {
                    this.player1.direction = PLAYER_DIRECTIONS.VERTICAL;
                    this.player2.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                } else if (this.snap.turn === TURNS.PLAYER2) {
                    this.player1.direction = PLAYER_DIRECTIONS.HORIZONTAL;
                    this.player2.direction = PLAYER_DIRECTIONS.VERTICAL;
                } else {
                    throw new Error('Error setting PLAYER_directions for players');
                }
            } else {
                throw new Error('Error setting PLAYER_directions for players');
            }
        }
    }
    /**
     * Update the last value based on the {@link Cell} located in the token's position.
     * The corresponding field in the game is updated.
     */
    updateLastValueInCellWhereTokenIs() {
        this.snap.lastValue = this.board.getValueInCellByToken(this.token);
    }
    /**
     * Update the status of the game. For possible values see {@link flags.GAME_STATUSES}.
     *
     * @param {number} status
     */
    updateStatus(status) {
        // TODO: Check is status is valid.
        this.snap.status = status;
    }
    /**
     * Use the {@link Token} to update the values of the {@link Cell}s in the {@link Board}.
     * See {@link Board#update}.
     */
    updateCellsWhereTokenIs() {
        this.board.updateCellsByToken(this.token);
    }
    /**
     * Update the score of the current {@link Player}.
     *
     * @throws {Error} if the turn set in the game is not a value from {@link flags.TURNS}.
     */
    updateCurrentPlayerScore() {
        if (this.snap.turn === TURNS.PLAYER1) {
            this.player1.incrementScore(this.snap.lastValue);
        } else if (this.snap.turn === TURNS.PLAYER2) {
            this.player2.incrementScore(this.snap.lastValue);
        } else {
            throw new Error('Error updating scores');
        }
    }
    /**
     * Pass the token to the other {@link Player}.
     *
     * @throws {Error} if the turn set in the game is not a value from {@link flags.TURNS}.
     */
    passToken() {
        if (this.snap.turn === TURNS.PLAYER1) {
            this.snap.turn = TURNS.PLAYER2;
        } else if (this.snap.turn === TURNS.PLAYER2) {
            this.snap.turn = TURNS.PLAYER1;
        } else {
            throw new Error('Error passing token');
        }
    }
    /**
     * Update the continuity of the game. For possible values see {@link flags.GAME_CONTINUITY}.
     *
     * @throws {Error} if the turn set in the game is not a value from {@link flags.TURNS}.
     */
    updateContinuity() {
        if (this.snap.turn === TURNS.PLAYER1) {
            if (!this.board.canPlayerMakeMove(this.player1, this.token)) {
                this.snap.continuity = GAME_CONTINUITY.OVER;
            }
        } else if (this.snap.turn === TURNS.PLAYER2) {
            if (!this.board.canPlayerMakeMove(this.player2, this.token)) {
                this.snap.continuity = GAME_CONTINUITY.OVER;
            }
        } else {
            throw new Error('Error checking continuity of game');
        }
    }
    /**
     * Get the current {@link Player}, the one that has to move the {@link Token}.
     *
     * @throws {Error} if the turn set in the game is not a value from {@link flags.TURNS}.
     */
    getCurrentPlayer() {
        if (this.snap.turn === TURNS.PLAYER1) {
            return this.player1;
        } else if (this.snap.turn === TURNS.PLAYER2) {
            return this.player2;
        } else {
            throw new Error('Error getting current player');
        }
    }
    /**
     * Get the next {@link Player}, the one that does not have to move the {@link Token}.
     *
     * @throws {Error} if the turn set in the game is not a value from {@link flags.TURNS}.
     */
    getNextPlayer() {
        if (this.snap.turn === TURNS.PLAYER1) {
            return this.player2;
        } else if (this.snap.turn === TURNS.PLAYER2) {
            return this.player1;
        } else {
            throw new Error('Error getting next player');
        }
    }
    /**
     * Serialize game. See
     * {@link Token#serialize}
     * {@link Board#serialize}
     * {@link Player#serialize}
     *
     * @returns {object} Serialized game.
     */
    serialize() {
        return {
            token: this.token.serialize(),
            board: this.board.serialize(),
            player1: this.player1.serialize(),
            player2: this.player2.serialize(),
            snap: this.snap,
        };
    }
    /**
     * Update game from literal. See
     * {@link Token#updateFromObject}
     * {@link Board#updateFromVector}
     * {@link Player#updateFromObject}
     *
     * @param {object} game
     */
    updateFromObject(game) {
        for (const key of Object.keys(game)) {
            switch (key) {
                case 'token':
                    this.token.updateFromObject(game[key]);
                    continue;
                case 'board':
                    this.board.updateFromVector(game[key]);
                    continue;
                case 'player1':
                    this.player1.updateFromObject(game[key]);
                    continue;
                case 'player2':
                    this.player2.updateFromObject(game[key]);
                    continue;
                case 'snap':
                    updateObjectFromLiteral(this.snap, game[key]);
                    continue;
                default:
                    continue;
            }
        }
    }
}

module.exports = {
    Game,
};
