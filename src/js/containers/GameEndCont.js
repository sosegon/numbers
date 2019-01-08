const { connect } = require('react-redux');
const { GameEndComp } = require('../components/GameEndComp.js');

const getStyle = (isOver) => {
    return isOver ? 'overlay' : 'hid';
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
        style: getStyle(state.snap.isOver),
        message: getMessage(state.player1.score, state.player2.score)
    };
};

const GameEndCont = connect(mapStateToProps)(GameEndComp);

module.exports = {
    GameEndCont
};