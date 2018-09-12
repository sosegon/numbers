class GameView extends React.Component {
	constructor(props) {
		super(props);
		this.setup();
	}
	setup() {
		let game = new Game(Board.size);
		game.board.update(game.token);
		this.state = {game: game};
	}
	handleKeyDown(event) {
		if(this.state.direction !== null) return;
		event.preventDefault();
		if(event.keyCode === 38 || event.keyCode === 40) {
			this.state.direction = true;
		} else if(event.keyCode === 37 || event.keyCode === 39) {
			this.state.direction = false;
		}
	}
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown.bind(this));
	}
	moveToken(rowIndex, colIndex) {
		this.state.game.moveToken(rowIndex, colIndex);
		this.state.game.takeCell();
		this.state.game.state = 1;
		this.setState({game: this.state.game});
	}
	updateScores() {
		this.state.game.updateScores();
		this.state.game.updateBoard();
		this.state.game.passToken();
		this.state.game.state = 0;
		this.setState({game: this.state.game});
	}
	render() {
		let currentGame = this.state.game;
		let gameView = this;
		let cells = this.state.game.board.cells.map((row, rowIndex) => {
			return (
				<div>
					{row.map((col, colIndex) => <CellView
						cell={col}
						game={currentGame}
						gameView={gameView}/>)}
				</div>
			)
		});
		let wildCardCell = (<WildCardView cell={this.state.game.token} />)
		let scoreA = this.state.game.player1.score;
		let scoreB = this.state.game.player2.score;
		let scorePlayer = (
			<ScoreView score={scoreA} />
		);
		let scoreAgent = (
			<ScoreView score={scoreB} />
		);
		return (
			<div>
				<div className='board'>
					{wildCardCell}
					{cells}
					<GameEndOverlay gameEnd={false} scoreA={scoreA} scoreB={scoreB} />
				</div>
				<div className="scores-container">
					{scorePlayer} {scoreAgent}
				</div>
			</div>
		);
	}
}

class CellView extends React.Component {
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
			setTimeout(() => resolve(), 250);
		});
	}
	updateScores() {
		this.props.gameView.updateScores();
		let game = this.props.game;
		return new Promise((resolve, reject) => {
			let cont = game.canContinue();
			if(cont) {
				setTimeout(() => resolve(), 250);
			} else {
				// TODO:
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
				let position = agent.maxCell(game.token, game.board);
				if(position[0] >= 0 && position[1] >= 0) {
					setTimeout(() => resolve(position), 250);
				} else {
					// TODO: game over
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
			let cellClass = 'cell';
			if(isSelectable && game.turn)
				cellClass += ' selectable';
			else if(isSelectable && !game.turn)
				cellClass += ' agent';

			if(hid) {
				cellClass += ' hid';
			}

			return cellClass;
		}
		return (
			<span className={generateClassName(isSelectable, hid)} onClick={this.pick.bind(this)}>{value}</span>
		);
	}
}

class ScoreView extends React.Component {
	render() {
		let score = this.props.score;
		return(
			<div className="score-container">
				<span>{score}</span>
			</div>
		)
	}
}

class WildCardView extends React.Component {
	render() {
		var cell = this.props.cell;
		var classArray = ['wild-card'];
		classArray.push('position_' + cell.rowIndex + '_' + cell.colIndex);
		classArray.push('row_from_' + cell.oldRowIndex + '_to_' + cell.rowIndex);
		classArray.push('column_from_' + cell.oldColIndex + '_to_' + cell.colIndex);
		var classes = classArray.join(' ');
		return (
			<span className={classes}>★</span>
		)
	}
}

var GameEndOverlay = ({gameEnd, scoreA, scoreB}) => {
	let content = '';
	if(gameEnd) {
		if(scoreA > scoreB) {
			content = 'You won';
		} else if (scoreA < scoreB) {
			content = 'You lose';
		} else {
			content = 'Draw';
		}
	}
	if(!content) {
		return null;
	}

	return(
		<div>
			<p>{content}</p>
		</div>
	);
};

var GameViewRendered = ReactDOM.render(<GameView />, document.getElementById('boardDiv'));