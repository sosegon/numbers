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
	render() {
		let isSelectable = function(rowIndex, colIndex, wildRowIndex, wildColIndex, direction){
			if(direction === null) {
				return rowIndex === wildRowIndex || colIndex === wildColIndex;
			} else if(direction === true) {
				return colIndex === wildColIndex;
			} else if(direction === false) {
				return rowIndex === wildRowIndex;
			}
			return false;
		}
		let wildRowIndex, wildColIndex;
		for(let i = 0; i < Board.size; i++) {
			for(let j = 0; j < Board.size; j++) {
				if(this.state.board.cells[i][j].value === 0) {
					wildColIndex = i;
					wildRowIndex = j;
					break;
				}
			}
		}
		let direction = this.state.direction;
		let cells = this.state.board.cells.map((row, rowIndex) => {
			return (
				<div>
					{row.map((col, colIndex) => <CellView value={col.value}
						isSelectable={isSelectable(rowIndex, colIndex, wildColIndex, wildRowIndex, direction)}/>)}
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
	shouldComponentUpdate() {
		return true;
	}
	render() {
		let value = this.props.value;
		let isSelectable = this.props.isSelectable;
		let generateClassName = function(isSelectable) {
			let cellClass = 'cell';
			if(isSelectable)
				cellClass += ' selectable';

			return cellClass;
		}
		return (
			<span className={generateClassName(isSelectable)}>{value}</span>
		);
	}
}

class TileView extends React.Component {

}

var BoardViewRendered = ReactDOM.render(<BoardView />, document.getElementById('boardDiv'));