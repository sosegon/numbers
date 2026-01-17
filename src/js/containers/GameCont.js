const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { GameComp } = require('@components/GameComp');
const { resetGame } = require('@reducers/gameActions');
const { vectorToMatrix } = require('@model/utils');

const mapStateToProps = (state) => {
    return {
        board: vectorToMatrix(state.game.board),
        player1Direction: state.game.player1.direction,
        player2Direction: state.game.player2.direction,
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
 * Container to connect a {@link GameComp}.
 * @param {object} props
 * @param {number} props.boardSize Size of a {@link Board}.
 */
const GameCont = connect(mapStateToProps, mapDispatchToProps)(GameComp);

GameCont.propTypes = {
    boardSize: PropTypes.number.isRequired,
};

module.exports = {
    GameCont,
};
