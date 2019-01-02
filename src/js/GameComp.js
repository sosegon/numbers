const {Component} = require('react');
const {CellComp} = require('./CellComp.js');
const {ScoreComp} = require('./ScoreComp.js');
const {WildCardComp} = require('./WildCardComp.js');
const {GameEndComp} = require('./GameEndComp.js');
const {Game} = require('./board.js');
const {LocalStorageManager} = require('./localStorage.js');

class GameComp extends Component {
	constructor(props) {
		super(props);
		this.setup();
	}
	setup() {
		this.storageManager = new LocalStorageManager;
		let previousState = this.storageManager.getGameState();
		let game = new Game(previousState);
		this.state = {game: game};
	}
	reset() {
		let game = new Game();
		this.setState({game: game});
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
		this.state.game.status = 1;
		this.setState({game: this.state.game});
	}
	updateScores() {
		this.state.game.updateScores();
		this.state.game.updateBoard();
		this.state.game.passToken();
		this.state.game.status = 0;
		this.setState({game: this.state.game});
	}
	finishGame() {
		this.state.game.isOver = true;
		this.setState({game: this.state.game});
	}
	saveGameState() {
		this.storageManager.setGameState(this.state.game.serialize());
	}
	render() {
		if((this.state.game.status === 0 && this.state.game.turn)
			|| this.state.game.isOver) { // not moving token and human turn or game is over
			this.saveGameState();
		}
		let currentGame = this.state.game;
		let gameComp = this;
		let cells = this.state.game.board.cells.map((row, rowIndex) => {
			return (
				<div>
					{row.map((col, colIndex) => <CellComp
						cell={col}
						game={currentGame}
						gameComp={gameComp}/>)}
				</div>
			)
		});
		let wildCardCell = (<WildCardComp cell={this.state.game.token} />)
		let scoreA = this.state.game.player1.score;
		let scoreB = this.state.game.player2.score;
		let scorePlayer = (
			<ScoreComp score={scoreA} name="You"/>
		);
		let scoreAgent = (
			<ScoreComp score={scoreB} name="AI"/>
		);
		let isOver = this.state.game.isOver;
		return (
			<div>
				<div className="buttons-container">
					<button className="tryAgain" onClick={this.reset.bind(this)}>Restart</button>
				</div>
				<div className='board'>
					{wildCardCell}
					{cells}
					<GameEndComp game={this.state.game} />
				</div>
				<div className="scores-container">
					{scorePlayer} {scoreAgent}
				</div>
			</div>
		);
	}
}

module.exports = {
	GameComp
};