const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { CellComp } = require('../components/CellComp.js');
const actions = require('../actions.js');
const { Token } = require('../model/Token.js');
const { Agent } = require('../model/Agent.js');
const { vectorToMatrix } = require('../model/utils.js');
const { TURNS, PLAYER_DIRECTIONS, GAME_CONTINUITY } = require('../model/flags.js');

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

const moveToken = (object) => {
    const { dispatch, getState, position } = object;

    dispatch(actions.moveToken(position.rowIndex, position.colIndex));
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ dispatch, getState }), delay);
    });
};

const updateScores = (object) => {
    const { dispatch, getState } = object;
    dispatch(actions.updateScores());
    return new Promise((resolve, reject) => {
        if (getState().snap.continuity === GAME_CONTINUITY.CONTINUE) {
            console.log(getState().snap.continuity);
            setTimeout(() => resolve({ dispatch, getState }), delay);
        } else {
            // TODO: This is still unclear
            console.log("TODO: This is still unclear");
        }
    });
};

const execAgent = (object) => {
    const { dispatch, getState } = object;
    const agent = new Agent();
    const token = new Token(9); // Argument does not matter

    const boardMatrix = vectorToMatrix(getState().board)
    agent.updateFromObject(getState().player2);
    token.updateFromObject(getState().token);

    return new Promise((resolve, reject) => {
        const bestPosition = agent.getMaxGainValuePosition(token, boardMatrix);
        if (bestPosition[0] >= 0 && bestPosition[1] >= 0) {
            const position = { rowIndex: bestPosition[0], colIndex: bestPosition[1] };
            setTimeout(() => resolve({ dispatch, getState, position }), delay);
        } else {
            console.log("Error in agent");
        }
    });
};

const makeMove = (ownProps, isSelectable) => {
    return (dispatch, getState) => {
        if (!isSelectable) {
            return;
        }

        const { rowIndex, colIndex } = ownProps;
        const position = { rowIndex, colIndex };
        new Promise((resolve, reject) => {
                resolve({ dispatch, getState, position });
            })
            .then(object => moveToken(object))
            .then(object => updateScores(object))
            .then(object => execAgent(object))
            .then(object => moveToken(object))
            .then(object => updateScores(object));
    };
};

const mapStateToProps = (state, ownProps) => {
    const { rowIndex, colIndex, value } = ownProps;
    const isSelectable = isCellSelectable(state, ownProps);
    const hid = value <= 0;
    const turn = state.snap.turn;
    const style = generateStyle(isSelectable, hid, turn);
    const gameStatus = state.snap.status;

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

/**
 * Container to connect a {@link CellComp}.
 * @param {object} props
 * @param {number} props.rowIndex Row index of the {@link Cell} in a {@link Board}.
 * @param {number} props.colIndex Column index of the {@link Cell} in a {@link Board}.
 * @param {number} props.value Value of the {@link Cell}.
 */
const CellCont = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CellComp);

CellCont.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

module.exports = {
    CellCont
};