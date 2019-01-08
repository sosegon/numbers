const { updateObjectFromLiteral } = require('./utils.js');
const { PLAYER_DIRECTIONS } = require('./constants.js');

class Player {
    constructor() {
        this.score = 0;
        this.direction = PLAYER_DIRECTIONS.NONE;
    }
    incrementScore = (value) => {
        this.score += value;
    };
    serialize = () => {
        return {
            score: this.score,
            direction: this.direction
        };
    };
    toString = () => {
        return JSON.stringify(this.serialize());
    };
    updateFromObject = (player) => {
        updateObjectFromLiteral(this, player);
    };
}

module.exports = {
    Player
};