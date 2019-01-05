const { Component } = require('react');
const { GAME_STATUSES, TURNS, PLAYER_DIRECTIONS } = require('./model/constants.js');

const delay = 200;
class CellComp extends Component {
    isSelectable() {
        let rowIndex = this.props.cell.rowIndex;
        let colIndex = this.props.cell.colIndex;
        let tokenRowIndex = this.props.game.token.rowIndex;
        let tokenColIndex = this.props.game.token.colIndex;

        if (rowIndex === tokenRowIndex && colIndex === tokenColIndex) {
            // Cell of token is not selectable
            return false;
        }

        let direction = this.props.game.getCurrentPlayer().direction;
        let cellValue = this.props.cell.value;
        if (direction === PLAYER_DIRECTIONS.NONE) {
            return (rowIndex === tokenRowIndex || colIndex === tokenColIndex) && cellValue > 0
        } else if (direction === PLAYER_DIRECTIONS.VERTICAL) {
            return colIndex === tokenColIndex && cellValue > 0;
        } else if (direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            return rowIndex === tokenRowIndex && cellValue > 0;
        } else {
            return false;
        }
    }
    moveToken(position) {
        this.props.gameComp.moveToken(position[0], position[1]);
        return new Promise((resolve, reject) => {
            setTimeout(resolve, delay);
        });
    }
    updateScores() {
        this.props.gameComp.updateScores();
        let game = this.props.game;
        return new Promise((resolve, reject) => {
            if (game.canContinue()) {
                setTimeout(() => resolve(), delay);
            } else {
                this.props.gameComp.finishGame();
            }
        });
    }
    pick() {
        let colIndex = this.props.cell.colIndex;
        let rowIndex = this.props.cell.rowIndex;
        let game = this.props.game;

        let self = this;
        new Promise((resolve, reject) => {
                resolve([rowIndex, colIndex]);
            })
            .then((position) => {
                self.moveToken(position);
            })
            .then(() => {
                self.updateScores();
            })
            .then(() => {
                let agent = game.getCurrentPlayer();
                return new Promise((resolve, reject) => {
                    let position = agent.maxGainCell(game.token, game.board.asMatrix());
                    if (position[0] >= 0 && position[1] >= 0) {
                        setTimeout(() => resolve(position), delay);
                    } else {
                        console.log("Error in agent");
                    }
                });
            })
            .then((position) => self.moveToken(position))
            .then(() => self.updateScores());
    }
    shouldComponentUpdate() {
        return this.props.game.snap.status !== GAME_STATUSES.MOVING_TOKEN;
    }
    render() {
        let value = this.props.cell.value;
        let hid = value <= 0;
        let isSelectable = this.isSelectable();
        let game = this.props.game;

        let generateClassName = function(isSelectable, hid) {
            let classArray = ['cell'];
            if (isSelectable && game.snap.turn === TURNS.PLAYER1) {
                classArray.push('selectable');
            } else if (isSelectable && game.snap.turn === TURNS.PLAYER2) {
                classArray.push('agent');
            }

            if (hid) {
                classArray.push('hid');
            }

            return classArray.join(' ');
        }
        let dom = (<span className={generateClassName(isSelectable, hid)}>{value}</span>);
        if (isSelectable) {
            dom = (<span className={generateClassName(isSelectable, hid)} onClick={this.pick.bind(this)}>{value}</span>);
        }
        return dom;
    }
}

module.exports = {
    CellComp
};