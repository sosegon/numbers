class GameView extends React.Component {
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
			<ScoreView score={scoreA} name="You"/>
		);
		let scoreAgent = (
			<ScoreView score={scoreB} name="AI"/>
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
					<GameEndOverlay game={this.state.game} />
				</div>
				<div className="scores-container">
					{scorePlayer} {scoreAgent}
				</div>
			</div>
		);
	}
}

const delay = 200;
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
				let position = agent.maxCell(game.token, game.board);
				if(position[0] >= 0 && position[1] >= 0) {
					setTimeout(() => resolve(position), delay);
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

class ScoreView extends React.Component {
	render() {
		let score = this.props.score;
		let name = this.props.name;
		return(
			<div className="score-container">
				<span className="player-name">{name}</span>
				<span className="player-score">{score}</span>
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

var GameEndOverlay = ({game}) => {
	let content = '';
	let scoreA = game.player1.score;
	let scoreB = game.player2.score;
	let gameEnd = game.isOver;
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
		<div className='overlay'>
			<p className='message'>{content}</p>
		</div>
	);
};

var GameViewRendered = ReactDOM.render(<GameView />, document.getElementById('boardDiv'));

// Adjust the board to the device's screen
var rescale = function(screenHeight, screenWidth) {
  var screenHeight = screen.height;
  var screenWidth = screen.width;
  // var screenHeight = window.innerHeight;
  // var screenWidth = window.innerWidth;
  // var screenHeight = window.innerHeight * window.devicePixelRatio;
  // var screenWidth = window.innerWidth * window.devicePixelRatio;
  // var screenRatio = screenWidth / screenHeight;

  // Scrolling on the following devices
  // PIXEL 2XL landscape
  // iPhone 5/SE landscape
  // iPhone 6/7/8 landscape
  // iPhone 6/7/8 plus landscape
  // iPhone X landscape
  // iPad landscape and portrait
  // iPad Pro landscape and portrait
  var antiScroll = 1.0;
  var gameWidth = 450 * antiScroll;
  var gameHeight = 733 * antiScroll;
  var gameRatio = gameWidth / gameHeight;

  //console.log("screen ratio: " + screenRatio + ", game ratio: " + gameRatio);
  var scale = 1;

  // gameHeight > gameWidth always
  // The game has to fit the screen device always
  //console.log("screenHeight: " + screenHeight);
  //console.log("screenWidth:  " + screenWidth);
  //console.log("gameHeight:   " + gameHeight);
  //console.log("gameWidth:    " + gameWidth);
  if(screenHeight >= screenWidth) {
    if(screenHeight >= gameHeight && screenWidth >= gameWidth) { // Consider ratios
      if(screenRatio >= gameRatio) { // Increase gameHeight
        scale = screenHeight / gameHeight;
        //console.log("case 1_1");
      } else { // Increase gameWidth
        scale = screenWidth / gameWidth;
        //console.log("case 1_2"); // never happens
      }
    } else if(screenHeight >= gameHeight && screenWidth < gameWidth){ // Decrease the gameWidth
      scale = screenWidth / gameWidth;
      //console.log("case 2");
    } else if(screenHeight < gameHeight && screenWidth >= gameWidth){ // Decrease the gameHeight
      scale = screenHeight / gameHeight;
      //console.log("case 3");
    } else { // Consider ratios
      if(screenRatio >= gameRatio) { // Decrease gameHeight
        scale = screenHeight / gameHeight;
        //console.log("case 4_1");
      } else { // Decrease gameWidth
        scale = screenWidth / gameWidth;
        //console.log("case 4_2");
      }
    }
  } else {
    if(screenHeight >= gameHeight && screenWidth >= gameWidth) { // Consider ratios
      if(screenRatio >= gameRatio) { // Increase gameHeight
        scale = screenHeight / gameHeight;
        //console.log("case 5_1");
      } else { // Increase gameWidth
        scale = screenWidth / gameWidth;
        //console.log("case 5_2"); // never happens
      }
    } else if(screenHeight >= gameHeight && screenWidth < gameWidth){ // Decrease the gameWidth
      scale = screenWidth / gameWidth;
      //console.log("case 6"); // never happens
    } else if(screenHeight < gameHeight && screenWidth >= gameWidth){ // Decrease the gameHeight
      scale = screenHeight / gameHeight;
      //console.log("case 7");
    } else { // Consider ratios
      if(screenRatio >= gameRatio) { // Decrease gameHeight
        scale = screenHeight / gameHeight;
        //console.log("case 8_1");
      } else { // Decrease gameWidth
        scale = screenWidth / gameWidth;
        //console.log("case 8_2"); // never happens
      }
    }
  }

  var board = document.getElementById("boardDiv");
  board.style.zoom = scale;
  board.style.display = "block";
  //console.log("scalew: " + scale);
};
rescale();
// window.setTimeout(rescale, 0);