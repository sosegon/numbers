const { updateObjectFromLiteral } = require('./utils.js');
const { PLAYER_DIRECTIONS } = require('./flags.js');

/**
 * Class representing a player. A player has a direction of playing
 * and a score.
 */
class Player {
    /**
     * Create a player.
     *
     */
    constructor() {
        this.score = 0;
        this.direction = PLAYER_DIRECTIONS.NONE;
    }
    /**
     * Increment player's score.
     *
     * @param {number} value - The value to be added to the score.
     */
    incrementScore(value) {
        this.score += value;
    }
    /**
     * Serialize player.
     *
     * @returns {object} Serialized player.
     */
    serialize() {
        return {
            score: this.score,
            direction: this.direction
        };
    }
    /**
     * Convert serialized player to string.
     *
     * @returns {string} Stringified player.
     */
    toString() {
        return JSON.stringify(this.serialize());
    }
    /**
     * Update player from literal.
     *
     * @param {object} player
     */
    updateFromObject(player) {
        updateObjectFromLiteral(this, player);
    };
}

module.exports = {
    Player
};