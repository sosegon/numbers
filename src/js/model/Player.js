const DIRECTIONS = {
    NONE: 0,
    HORIZONTAL: 1,
    VERTICAL: 2
};

class Player {
    constructor() {
        this.score = 0;
        this.direction = DIRECTIONS.NONE;
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
}

module.exports = {
    DIRECTIONS,
    Player
};