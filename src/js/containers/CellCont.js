const { connect } = require('react-redux');
const { CellComp } = require('../components/CellComp.js');
const actions = require('../actions.js');
const { TURNS, PLAYER_DIRECTIONS } = require('../model/constants.js');

const delay = 200;

const isCellSelectable = (state, ownProps) => {
    const { rowIndex, colIndex, value } = ownProps;
    const tokenRowIndex = state.token.rowIndex;
    const tokenColIndex = state.token.colIndex;

    if (rowIndex === tokenRowIndex && colIndex === tokenColIndex) {
        return false;
    }

    const turn = state.snap.turn;
    const direction = turn === TURNS.PLAYER1 ?
        state.player1.direction :
        state.player2.direction;

    if (direction === PLAYER_DIRECTIONS.NONE) {
        return (rowIndex === tokenRowIndex || colIndex === tokenColIndex) && value > 0
    } else if (direction === PLAYER_DIRECTIONS.VERTICAL) {
        return colIndex === tokenColIndex && value > 0;
    } else if (direction === PLAYER_DIRECTIONS.HORIZONTAL) {
        return rowIndex === tokenRowIndex && value > 0;
    } else {
        return false;
    }
};

const generateStyle = (isSelectable, hid, turn) => {
    let classArray = ['cell'];
    if (isSelectable && turn === TURNS.PLAYER1) {
        classArray.push('selectable');
    } else if (isSelectable && turn === TURNS.PLAYER2) {
        classArray.push('agent');
    }

    if (hid) {
        classArray.push('hid');
    }

    return classArray.join(' ');
};

const makeMove = (ownProps, isSelectable) => {
    return (dispatch, getState) => {
        if (!isSelectable) {
            return;
        }
        const { rowIndex, colIndex } = ownProps;
        dispatch(actions.moveToken(rowIndex, colIndex));

        // const { rowIndex, colIndex } = ownProps;
        // new Promise((resolve, reject) => {
        //     resolve(rowIndex, colIndex);
        // }).then((rowIndex, colIndex) => {
        //     dispatch(actions.moveToken(rowIndex, colIndex));

        //     return new Promise((resolve, reject) => {
        //         setTimeout(resolve.delay);
        //     });
        // }).then(() => {
        //     dispatch(actions.updateScores());
        //     // TODO: Add the logic for:
        //     // - check game continuity
        //     // - agent move
        // });
    };
};

const mapStateToProps = (state, ownProps) => {
    const { rowIndex, colIndex, value } = ownProps;
    const isSelectable = isCellSelectable(state, ownProps);
    const hid = value <= 0;
    const turn = state.snap.turn;
    const style = generateStyle(isSelectable, hid, turn)
    const gameStatus = state.snap.status

    return {
        rowIndex,
        colIndex,
        style,
        isSelectable,
        gameStatus,
        value
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (isSelectable) => {
            dispatch(makeMove(ownProps, isSelectable));
        }
    };
};

const mergeProps = (propsFromState, propFromDispatch) => {
    return {
        ...propsFromState,
        onClick: () => propFromDispatch.onClick(propsFromState.isSelectable)
    };
};

const CellCont = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CellComp);

module.exports = {
    CellCont
};