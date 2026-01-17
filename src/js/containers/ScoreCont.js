const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { ScoreComp } = require('@components/ScoreComp');
const { PLAYER_DIRECTIONS, TURNS } = require('@model/flags');

const mapStatToProps = (state, ownProps) => {
    const { playerName, direction } = ownProps;
    const name = playerName === TURNS.PLAYER1 ? 'You' : 'AI CORE';
    let score = playerName === TURNS.PLAYER1 ? state.game.player1.score : state.game.player2.score;

    const digits = 2;
    let scoreStr = `${score}`;
    while (scoreStr.length < digits) {
        scoreStr = '0' + scoreStr;
    }

    return {
        name,
        score,
        direction:
            direction === PLAYER_DIRECTIONS.NONE
                ? ''
                : direction === PLAYER_DIRECTIONS.HORIZONTAL
                  ? 'rows'
                  : 'columns',
        'data-testid': ownProps['data-testid'],
    };
};

/**
 * Container to connect a {@link ScoreComp}.
 * @param {object} props
 * @param {number} props.score Score of a {@link Player}.
 * @param {number} props.playerName Flag to identify a {@link Player}. See {@link flags.TURNS}.
 * @param {number} props.direction Flag to identify a {@link Player}'s direction. See {@link flags.PLAYER_DIRECTIONS}.
 */
const ScoreCont = connect(mapStatToProps)(ScoreComp);

ScoreCont.propTypes = {
    playerName: PropTypes.oneOf(Object.values(TURNS)),
    direction: PropTypes.oneOf(Object.values(PLAYER_DIRECTIONS)),
    'data-testid': PropTypes.string,
};

module.exports = {
    ScoreCont,
};
