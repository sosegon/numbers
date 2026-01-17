const React = require('react');
const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const { CellComp } = require('@components/CellComp');
const gameActions = require('@reducers/gameActions');
const { Token } = require('@model/Token');
const { Agent } = require('@model/Agent');
const { vectorToMatrix } = require('@model/utils');
const { TURNS, PLAYER_DIRECTIONS, GAME_CONTINUITY } = require('@model/flags');

const delay = 300;

const isCellSelectable = (state, ownProps) => {
    const { rowIndex, colIndex, value } = ownProps;
    const tokenRowIndex = state.game.token.rowIndex;
    const tokenColIndex = state.game.token.colIndex;

    if (rowIndex === tokenRowIndex && colIndex === tokenColIndex) {
        return false;
    }

    const turn = state.game.snap.turn;
    const direction =
        turn === TURNS.PLAYER1 ? state.game.player1.direction : state.game.player2.direction;

    if (direction === PLAYER_DIRECTIONS.NONE) {
        return (rowIndex === tokenRowIndex || colIndex === tokenColIndex) && value > 0;
    } else if (direction === PLAYER_DIRECTIONS.VERTICAL) {
        return colIndex === tokenColIndex && value > 0;
    } else if (direction === PLAYER_DIRECTIONS.HORIZONTAL) {
        return rowIndex === tokenRowIndex && value > 0;
    } else {
        return false;
    }
};

const moveToken = (object) => {
    const { dispatch, getState, position } = object;

    dispatch(gameActions.moveToken(position.rowIndex, position.colIndex));
    return new Promise((resolve) => {
        setTimeout(() => resolve({ dispatch, getState }), delay);
    });
};

const updateScores = (object) => {
    const { dispatch, getState } = object;
    dispatch(gameActions.updateScores());
    return new Promise((resolve) => {
        if (getState().game.snap.continuity === GAME_CONTINUITY.CONTINUE) {
            setTimeout(() => resolve({ dispatch, getState }), delay);
        } else {
            // TODO: This is still unclear
            console.log('TODO: This is still unclear');
        }
    });
};

const execAgent = (object) => {
    const { dispatch, getState } = object;
    const agent = new Agent();
    const token = new Token(9); // Argument does not matter

    const boardMatrix = vectorToMatrix(getState().game.board);
    agent.updateFromObject(getState().game.player2);
    token.updateFromObject(getState().game.token);

    return new Promise((resolve) => {
        const bestPosition = agent.getMaxGainValuePosition(token, boardMatrix, {
            agent: getState().game.player2.score,
            player: getState().game.player1.score,
        });
        if (bestPosition[0] >= 0 && bestPosition[1] >= 0) {
            const position = { rowIndex: bestPosition[0], colIndex: bestPosition[1] };
            setTimeout(() => resolve({ dispatch, getState, position }), delay);
        } else {
            console.log('Error in agent');
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
        new Promise((resolve) => {
            resolve({ dispatch, getState, position });
        })
            .then((object) => moveToken(object))
            .then((object) => updateScores(object))
            .then((object) => execAgent(object))
            .then((object) => moveToken(object))
            .then((object) => updateScores(object));
    };
};

const mapStateToProps = (state, ownProps) => {
    const { rowIndex, colIndex, value, 'data-testid': dataTestId } = ownProps;
    const isSelectable = isCellSelectable(state, ownProps);
    const taken = value <= 0;
    const turn = state.game.snap.turn;
    const gameStatus = state.game.snap.status;

    return {
        rowIndex,
        colIndex,
        isSelectable,
        turn,
        taken,
        gameStatus,
        value,
        'data-testid': dataTestId,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (isSelectable) => {
            dispatch(makeMove(ownProps, isSelectable));
        },
    };
};

const mergeProps = (propsFromState, propFromDispatch) => {
    return {
        ...propsFromState,
        onClick: () => propFromDispatch.onClick(propsFromState.isSelectable),
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
    value: PropTypes.number.isRequired,
    'data-testid': PropTypes.string,
};

module.exports = {
    CellCont,
};
