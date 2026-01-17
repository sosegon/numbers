const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { GameEndComp } = require('@components/GameEndComp');
const { GAME_CONTINUITY, GAME_RESULT } = require('@model/flags');
const { resetGame } = require('@reducers/gameActions');

const getResult = (score1, score2) => {
    if (score1 > score2) {
        return GAME_RESULT.WON;
    } else if (score1 < score2) {
        return GAME_RESULT.LOST;
    } else {
        return GAME_RESULT.DRAW;
    }
};

const mapStateToProps = (state) => {
    return {
        isOver: state.game.snap.continuity === GAME_CONTINUITY.OVER,
        result: getResult(state.game.player1.score, state.game.player2.score),
        soundEnabled: state.settings.soundEnabled,
        soundLocked: state.settings.soundLocked,
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
