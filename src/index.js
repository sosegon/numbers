class BoardView extends React.Component {
	constructor(props) {
		super(props);
		this.setup();
	}
	setup() {
		// direction: true vertical, false horizontal
		this.state = {board: new Board, direction: null};
	}
	handleKeyDown(event) {
		if(this.state.direction !== null) return;
		event.preventDefault();
		if(event.keyCode === 38 || event.keyCode === 40) {
			this.state.direction = true;
		} else if(event.keyCode === 37 || event.keyCode === 39) {
			this.state.direction = false;
		}
		this.setState({board: this.state.board, direction: this.state.direction});
	}
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown.bind(this));
	}
	selectCell(rowIndex, colIndex) {
		// Define the direction if it is not set yet
		if(this.state.direction === null) {
			if(this.state.board.wildCardCell.rowIndex === rowIndex) {
				this.state.direction = false;
			} else if(this.state.board.wildCardCell.colIndex === colIndex) {
				this.state.direction = true;
			}
		}

		this.state.board.scoreA += this.state.board.moveWildCard(rowIndex, colIndex);
		this.state.board.gameEnd = !this.state.board.canMoveWildCard(!this.state.direction);
		this.setState({board: this.state.board, direction: this.state.direction});
	}
	updateForAgent() {
		this.state.board.agentPlaying = true;
		this.setState({board: this.state.board, direction: !this.state.direction})
	}
	runAgent() {
		this.state.board.scoreB += this.state.board.runAgent(this.state.direction);
		this.state.board.gameEnd = !this.state.board.canMoveWildCard(!this.state.direction);
		this.state.board.agentPlaying = false;
		this.setState({board: this.state.board, direction: !this.state.direction});
	}
	render() {
		let isSelectable = function(cellValue, rowIndex, colIndex, wildRowIndex, wildColIndex, direction){
			if(rowIndex === wildRowIndex && colIndex === wildColIndex) {
				// wild card is not selectable
				return false;
			}
			if(direction === null) {
				return (rowIndex === wildRowIndex || colIndex === wildColIndex) && cellValue > 0
			} else if(direction === true) {
				return colIndex === wildColIndex && cellValue > 0;
			} else if(direction === false) {
				return rowIndex === wildRowIndex && cellValue > 0;
			}
			return false;
		}
		let wildRowIndex = this.state.board.wildCardCell.rowIndex;
		let wildColIndex = this.state.board.wildCardCell.colIndex;
		let currentBoard = this;
		let direction = this.state.direction;
		let cells = this.state.board.cells.map((row, rowIndex) => {
			return (
				<div>
					{row.map((col, colIndex) => <
						CellView value={col.value}
						rowIndex={rowIndex}
						colIndex={colIndex}
						boardView={currentBoard}
						isSelectable={isSelectable(col.value, rowIndex, colIndex, wildRowIndex, wildColIndex, direction)}
						picked={col.value < 0}
						wildCard={col.value === 0}
					/>)}
				</div>
			)
		});
		let wildCardCell = (<WildCardView cell={this.state.board.wildCardCell} />)
		let scoreA = this.state.board.scoreA;
		let scoreB = this.state.board.scoreB;
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
					<GameEndOverlay gameEnd={this.state.board.gameEnd} scoreA={scoreA} scoreB={scoreB} />
				</div>
				<div className="scores-container">
					{scorePlayer} {scoreAgent}
				</div>
			</div>
		);
	}
}

class CellView extends React.Component {
	pick() {
		let colIndex = this.props.colIndex;
		let rowIndex = this.props.rowIndex;
		let boardView = this.props.boardView;
		let board = boardView.state.board;

		if(this.props.isSelectable && !board.agentPlaying) {
			boardView.selectCell(rowIndex, colIndex);

			let direction = boardView.state.direction;
			if(board.canMoveWildCard(!direction)){
				boardView.updateForAgent();
				setTimeout(() => {
					boardView.runAgent();
				}, 500)
			} else {
				// TODO: Add visual of game over
			}
		} else {
			console.log("unselectable");
			// TODO: Add visual message
		}
	}
	shouldComponentUpdate() {
		return true;
	}
	render() {
		let value = this.props.value;
		let col = this.props.colIndex;
		let row = this.props.rowIndex;
		let board = this.props.boardView.state.board;
		let isSelectable = this.props.isSelectable;
		let picked = this.props.picked;
		let wildCard = this.props.wildCard;
		let generateClassName = function(isSelectable, picked, wildCard) {
			let cellClass = 'cell';
			if(isSelectable && !board.agentPlaying)
				cellClass += ' selectable';
			else if(isSelectable && board.agentPlaying)
				cellClass += ' agent';

			if(picked) {
				cellClass += ' picked';
			}

			return cellClass;
		}
		return (
			<span className={generateClassName(isSelectable, picked, wildCard)} onClick={this.pick.bind(this)}>{value}</span>
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

var BoardViewRendered = ReactDOM.render(<BoardView />, document.getElementById('boardDiv'));