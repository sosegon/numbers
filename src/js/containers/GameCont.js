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

const GameCont = connect(mapStateToProps, mapDispatchToProps)(GameComp);

module.exports = {
    GameCont
};