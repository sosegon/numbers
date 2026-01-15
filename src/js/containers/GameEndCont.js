const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { GameEndComp } = require('@components/GameEndComp');
const { GAME_CONTINUITY } = require('@model/flags');
const actions = require('@root/actions');

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
        isOver: state.snap.continuity === GAME_CONTINUITY.OVER,
        message: getMessage(state.player1.score, state.player2.score),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset: () => {
            dispatch(actions.resetGame(ownProps.boardSize));
        },
    };
};

/**
 * Container to connect a {@link GameEndComp}.
 */
const GameEndCont = connect(mapStateToProps, mapDispatchToProps)(GameEndComp);

GameEndCont.propTypes = {
    boardSize: PropTypes.number.isRequired,
};
module.exports = {
    GameEndCont,
};
