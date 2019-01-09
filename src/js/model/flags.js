const GAME_STATUSES = {
    RESTING: 0,
    MOVING_TOKEN: 1
};

const TURNS = {
    PLAYER1: 0,
    PLAYER2: 1
};

const PLAYER_DIRECTIONS = {
    NONE: 0,
    HORIZONTAL: 1,
    VERTICAL: 2
};

const GAME_CONTINUITY = {
    CONTINUE: 0,
    OVER: 1
};

/**
 * Flags used in the logic's game.
 * @module flags
 */
module.exports = {
    /**
     * Define the status of the game.
     *
     * **RESTING**: The token is static.
     *
     * **MOVING_TOKEN**: The token is moving.
     */
    GAME_STATUSES,
    /**
     * Identify active player.
     *
     * **PLAYER1**: Human player.
     *
     * **PLAYER2**: AI player.
     */
    TURNS,
    /**
     * Identify players' directions.
     *
     * **NONE**: Set at the begining of every match.
     *
     * **VERTICAL**
     *
     * **HORIZONTAL**
     */
    PLAYER_DIRECTIONS,
    /**
     * Define continuity of game.
     *
     * **CONTINUE**: The game can go on.
     *
     * **OVER**: The game has finished. When the board has no more numbers,
     * or the current player is not able to select a number.
     */
    GAME_CONTINUITY
};