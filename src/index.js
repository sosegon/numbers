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
			if(this.state.board.wildRowIndex === rowIndex) {
				this.state.direction = false;
			} else if(this.state.board.wildColIndex === colIndex) {
				this.state.direction = true;
			}
		}

		this.state.board.moveWildCard(rowIndex, colIndex);
		this.setState({board: this.state.board, direction: this.state.direction});
	}
	updateForAgent() {
		this.state.board.agentPlaying = true;
		this.setState({board: this.state.board, direction: !this.state.direction})
	}
	runAgent() {
		this.state.board.runAgent(this.state.direction);
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
		let wildRowIndex = this.state.board.wildRowIndex;
		let wildColIndex = this.state.board.wildColIndex;
		let currentBoard = this;
		let direction = this.state.direction;
		let cells = this.state.board.cells.map((row, rowIndex) => {
			return (
				<div>
					{row.map((col, colIndex) => <CellView value={col.value}
						rowIndex={rowIndex}
						colIndex={colIndex}
						boardView={currentBoard}
						isSelectable={isSelectable(col.value, rowIndex, colIndex, wildRowIndex, wildColIndex, direction)}/>)}
				</div>
			)
		});

		return (
			<div>
				<div>
					{cells}
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
		if(this.props.isSelectable) {
			boardView.selectCell(rowIndex, colIndex);
			boardView.updateForAgent();
			setTimeout(() => {
				boardView.runAgent();
			}, 500)
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
		let generateClassName = function(isSelectable) {
			let cellClass = 'cell';
			if(isSelectable && !board.agentPlaying)
				cellClass += ' selectable';
			else if(isSelectable && board.agentPlaying)
				cellClass += ' agent';

			return cellClass;
		}
		return (
			<span className={generateClassName(isSelectable)} onClick={this.pick.bind(this)}>{value}</span>
		);
	}
}

class TileView extends React.Component {

}

var BoardViewRendered = ReactDOM.render(<BoardView />, document.getElementById('boardDiv'));