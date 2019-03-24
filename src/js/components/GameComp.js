const React = require('react');
const PropTypes = require('prop-types');
const { TURNS } = require('../model/flags.js');
const { CellCont } = require('../containers/CellCont.js');
const { WildCardCont } = require('../containers/WildCardCont.js');
const { GameEndCont } = require('../containers/GameEndCont.js');
const { ScoreCont } = require('../containers/ScoreCont.js');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders a {@link Game}.
 *
 * @param {object} props
 * @param {function} props.reset Function to reset a {@link Game}.
 * @param {array} props.board 2 dimensional array of numbers representing the
 * values of {@link Cell|Cells} in a {@link Board}.
 */
const GameComp = ({
    reset,
    board
}) => {
    let boardSize = board.length;
    let cells = board.map((row, rowIndex) => {
        let style = ['board-row'];

        if(rowIndex === boardSize - 1) {
            style.push('last-board-row');
        }

        style = style.join(' ');

        return (
            <div className={style}>
                {
                    row.map((col, colIndex) => <CellCont
                        rowIndex = { rowIndex }
                        colIndex = { colIndex }
                        value = { col } />)
                }
            </div>
        );
    });

    return (
        <div class="">
            <div className="container-fluid">
                <div className="top-bar row d-flex justify-content-center">
                    <div className="top-item col-lg-auto d-flex">
                        <img className="mt-auto" src="./images/restart.png" onClick={reset} />
                    </div>
                    <div className="left-score-box top-item col-lg-auto d-flex">
                        <ScoreCont playerName={TURNS.PLAYER1}/>
                    </div>
                    <div className="top-item col-lg-auto">
                        <div className="top-level">
                            <img className="mt-auto" src="./images/level.png" />
                        </div>
                    </div>
                    <div className="right-score-box top-item col-lg-auto d-flex">
                        <ScoreCont playerName={TURNS.PLAYER2}/>
                    </div>
                    <div className="top-item col-lg-auto d-flex">
                        <img className="mt-auto" src="./images/clock2.png" onClick={reset} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='board'>
                    <WildCardCont />
                    { cells }
                    <GameEndCont />
                </div>
            </div>
        </div>
    );
};

GameComp.propTypes = {
    reset: PropTypes.func.isRequired,
    board: PropTypes.array.isRequired
};

module.exports = {
    GameComp
};