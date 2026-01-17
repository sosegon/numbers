const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { GameEndComp } = require('@components/GameEndComp');
const { GAME_CONTINUITY } = require('@model/flags');
const { resetGame } = require('@reducers/gameActions');

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
        isOver: state.game.snap.continuity === GAME_CONTINUITY.OVER,
        message: getMessage(state.game.player1.score, state.game.player2.score),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset: () => {
            dispatch(resetGame(ownProps.boardSize));
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
