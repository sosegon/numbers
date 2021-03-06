const { connect } = require('react-redux');
const { GameEndComp } = require('../components/GameEndComp.js');
const { GAME_CONTINUITY } = require('../model/flags.js');
const actions = require('../actions.js');

const getStyle = (isOver) => {
    return isOver ? 'overlay' : 'invisible';
};

const getMessage = (score1, score2) => {
    if (score1 > score2) {
        return 'You won';
    } else if (score1 < score2) {
        return 'You lose';
    } else {
        return 'Draw';
    }
};

const mapStateToProps = (state) => {
    return {
        style: getStyle(state.snap.continuity === GAME_CONTINUITY.OVER),
        message: getMessage(state.player1.score, state.player2.score)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset: () => { dispatch(actions.resetGame(ownProps.boardSize)) }
    };
};

/**
 * Container to connect a {@link GameEndComp}.
 */
const GameEndCont = connect(mapStateToProps, mapDispatchToProps)(GameEndComp);

module.exports = {
    GameEndCont
};