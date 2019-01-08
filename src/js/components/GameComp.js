const React = require('react');
const PropTypes = require('prop-types');
const { TURNS } = require('../model/constants.js');
const { CellCont } = require('../containers/CellCont.js');
const { WildCardCont } = require('../containers/WildCardCont.js');
const { GameEndCont } = require('../containers/GameEndCont.js');
const { ScoreCont } = require('../containers/ScoreCont.js');

const GameComp = ({
    reset,
    board
}) => {
    let cells = board.map((row, rowIndex) => {
        return (
            <div>
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
        <div>
            <div className="buttons-container">
                <button className="tryAgain" onClick={reset}>Restart</button>
            </div>
            <div className='board'>
                <WildCardCont />
                { cells }
                <GameEndCont />
            </div>
            <div className="scores-container">
                <ScoreCont playerName={TURNS.PLAYER1}/>&nbsp;
                <ScoreCont playerName={TURNS.PLAYER2}/>
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