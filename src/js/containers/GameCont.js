const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { GameComp } = require('@components/GameComp');

const { vectorToMatrix } = require('@model/utils');

const mapStateToProps = (state) => {
    return {
        board: vectorToMatrix(state.game.board),
        player1Direction: state.game.player1.direction,
        player2Direction: state.game.player2.direction,
    };
};

/**
 * Container to connect a {@link GameComp}.
 * @param {object} props
 * @param {number} props.boardSize Size of a {@link Board}.
 */
const GameCont = connect(mapStateToProps)(GameComp);

GameCont.propTypes = {
    boardSize: PropTypes.number.isRequired,
};

module.exports = {
    GameCont,
};
