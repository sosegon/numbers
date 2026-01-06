const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { ScoreComp } = require('@components/ScoreComp');
const { TURNS } = require('@model/flags');

const mapStatToProps = (state, ownProps) => {
    const { playerName, direction } = ownProps;
    const name = playerName === TURNS.PLAYER1 ? 'You' : 'AI CORE';
    let score = playerName === TURNS.PLAYER1 ? state.player1.score : state.player2.score;

    const digits = 2;
    score = '' + score;
    while (score.length < digits) {
        score = '0' + score;
    }

    return {
        name,
        score,
        direction: direction === 0 ? '' : direction === 1 ? 'rows' : 'columns',
    };
};

/**
 * Container to connect a {@link ScoreComp}.
 * @param {object} props
 * @param {number} props.playerName Flag to identify a {@link Player}. See {@link flags.TURNS}.
 */
const ScoreCont = connect(mapStatToProps)(ScoreComp);

ScoreCont.propTypes = {
    playerName: PropTypes.number.isRequired,
};

module.exports = {
    ScoreCont,
};
