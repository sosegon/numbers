const { connect } = require('react-redux');
const { ScoreComp } = require('../components/ScoreComp.js');
const { TURNS } = require('../model/constants.js');

const mapStatToProps = (state, ownProps) => {
    const { playerName } = ownProps;
    const name = playerName === TURNS.PLAYER1 ? 'You' : 'AI';
    const score = playerName === TURNS.PLAYER1 ?
        state.player1.score :
        state.player2.score;

    return {
        name,
        score
    };
};

const ScoreCont = connect(mapStatToProps)(ScoreComp);

module.exports = {
    ScoreCont
};