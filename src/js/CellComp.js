const {Component} = require('react');

const delay = 200;
class CellComp extends Component {
	isSelectable() {
		let rowIndex = this.props.cell.rowIndex;
		let colIndex = this.props.cell.colIndex;
		let tokenRowIndex = this.props.game.token.rowIndex;
		let tokenColIndex = this.props.game.token.colIndex;

		if(rowIndex === tokenRowIndex && colIndex === tokenColIndex) {
			// Cell of token is not selectable
			return false;
		}

		let direction = this.props.game.getCurrentPlayer().direction;
		let cellValue = this.props.cell.value;
		if(direction === null) {
			return (rowIndex === tokenRowIndex || colIndex === tokenColIndex) && cellValue > 0
		} else if(direction === true) {
			return colIndex === tokenColIndex && cellValue > 0;
		} else if(direction === false) {
			return rowIndex === tokenRowIndex && cellValue > 0;
		}
		return false;
	}
	moveToken(position) {
		this.props.gameView.moveToken(position[0], position[1]);
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), delay);
		});
	}
	updateScores() {
		this.props.gameView.updateScores();
		let game = this.props.game;
		return new Promise((resolve, reject) => {
			if(game.canContinue()) {
				setTimeout(() => resolve(), delay);
			} else {
				this.props.gameView.finishGame();
			}
		});
	}
	pick() {
		let colIndex = this.props.cell.colIndex;
		let rowIndex = this.props.cell.rowIndex;
		let gameView = this.props.gameView;
		let game = this.props.game;

		let self = this;
		new Promise((resolve, reject) => {
			if(self.isSelectable())
				resolve([rowIndex, colIndex]);
			else {
				// TODO: Visual information
			}
		})
		.then((position) => self.moveToken(position))
		.then(() => self.updateScores())
		.then(() => {
			let agent = game.getCurrentPlayer();
			return new Promise((resolve, reject) => {
				let position = agent.maxGain(game.token, game.board.asMatrix());
				if(position[0] >= 0 && position[1] >= 0) {
					setTimeout(() => resolve(position), delay);
				} else {
					console.loge("Error in agent");
				}
			});
		})
		.then((position) => self.moveToken(position))
		.then(() => self.updateScores());
	}
	shouldComponentUpdate() {
		return this.props.game.state !== 1;
	}
	render() {
		let value = this.props.cell.value;
		let hid = value <= 0;
		let isSelectable = this.isSelectable();
		let game = this.props.game;

		let generateClassName = function(isSelectable, hid) {
			let classArray = ['cell'];
			if(isSelectable && game.turn)
				classArray.push('selectable');
			else if(isSelectable && !game.turn)
				classArray.push('agent');

			if(hid)
				classArray.push('hid');

			return classArray.join(' ');
		}
		return (
			<span className={generateClassName(isSelectable, hid)} onClick={this.pick.bind(this)}>{value}</span>
		);
	}
}

module.exports = {
	CellComp
};