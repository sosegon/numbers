const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { ScoreComp } = require('../components/ScoreComp.js');
const { TURNS } = require('../model/flags.js');

const mapStatToProps = (state, ownProps) => {
    const { playerName } = ownProps;
    const name = playerName === TURNS.PLAYER1 ? 'You' : 'AI';
    const style = playerName === TURNS.PLAYER1 ? 'player-1' : 'player-2';
    let score = playerName === TURNS.PLAYER1 ?
        state.player1.score :
        state.player2.score;

    const digits = 3;
    score = "" + score;
    while(score.length < digits) {
        score = "0" + score;
    }

    return {
        name,
        score,
        style
    };
};

/**
 * Container to connect a {@link ScoreComp}.
 * @param {object} props
 * @param {number} props.playerName Flag to identify a {@link Player}. See {@link flags.TURNS}.
 */
const ScoreCont = connect(mapStatToProps)(ScoreComp);

ScoreCont.propTypes = {
    playerName: PropTypes.number.isRequired
};

module.exports = {
    ScoreCont
};