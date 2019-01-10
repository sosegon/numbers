const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { GameComp } = require('../components/GameComp.js');
const actions = require('../actions.js');
const { vectorToMatrix } = require('../model/utils.js');


const mapStateToProps = (state) => {
    return {
        board: vectorToMatrix(state.board)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset: () => { dispatch(actions.resetGame(ownProps.boardSize)) }
    };
};

/**
 * Container to connect a {@link GameComp}.
 * @param {object} props
 * @param {number} props.boardSize Size of a {@link Board}.
 */
const GameCont = connect(mapStateToProps, mapDispatchToProps)(GameComp);

GameCont.propTypes = {
    boardSize: PropTypes.number.isRequired
};

module.exports = {
    GameCont
};