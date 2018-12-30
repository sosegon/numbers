class Game {
	constructor(state) {
		let boardSize = Board.size
		if(state) {
			boardSize = Math.sqrt(state.board.length);
			this.reset(boardSize);

			this.board.setCellValues(state.board);
			let tokenPos = this.board.findTokenPosition();
			this.token.set(tokenPos[0], tokenPos[1]);

			this.player1.direction = state.direction1;
			this.player2.direction = !state.direction1;
			this.player1.score = state.score1;
			this.player2.score = state.score2;

			this.turn = state.turn;
			this.started = state.started;
			this.isOver = state.isOver;
		} else {
			this.reset(boardSize);
		}
	}
	reset = (boardSize) => {
		this.board = new Board(boardSize);
		this.token = new Token(boardSize);
		this.board.update(this.token);
		this.player1 = new Player();
		this.player2 = new Agent();
		this.lastValue = 0;
		this.turn = true; // player 1
		this.started = false;
		this.isOver = false;
		this.status = 0; //0: resting, 1: moving token
	};
	moveToken = (rowIndex, colIndex) => {
		this.token.moveTo(rowIndex, colIndex);
		if(!this.started) {
			let direction;
			if(this.token.oldRowIndex === this.token.rowIndex)
				direction = false;
			else if(this.token.oldColIndex === this.token.colIndex)
				direction = true;

			if(this.turn){
				this.player1.direction = direction;
				this.player2.direction = !direction;
			}
			else {
				this.player2.direction = direction;
				this.player1.direction = !direction;
			}
			this.started = !this.started;
		}
	};
	takeCell = () => {
		this.lastValue = this.board.takeCurrentValue(this.token);
	};
	updateBoard = () => {
		this.board.update(this.token);
	};
	updateScores = () => {
		if(this.turn) {
			this.player1.incrementScore(this.lastValue);
		} else {
			this.player2.incrementScore(this.lastValue);
		}
	};
	passToken = () => {
		this.turn = !this.turn;
	};
	canContinue = () => {
		return this.board.isNextTurnPossible(this.turn ? this.player1 : this.player2, this.token);
	};
	getCurrentPlayer = () => {
		return this.turn ? this.player1 : this.player2;
	};
	getNextPlayer = () => {
		return this.turn ? this.player2 : this.player1;
	};
	serialize = () => {
		return {
			isOver: this.isOver,
			score1: this.player1.score,
			score2: this.player2.score,
			turn: this.turn,
			started: this.started,
			direction1: this.player1.direction,
			board: this.board.serialize()
		}
	}
}
class Player {
	constructor() {
		this.score = 0;
		this.direction = null; // Direction is set once the game starts
	}
	incrementScore = (value) => {
		this.score += value;
	};
}
class Agent extends Player{
	constructor() {
		super();
	}
	maxCell = (token, boardMatrix) => {
		// direction: true vertical, false horizontal
		// Simply select the cell with the highest value
		let nBoardMatrix = boardMatrix;
		let nTokenColIndex = token.colIndex;

		if(!this.direction) {
			nBoardMatrix = rotateClockwise(boardMatrix);
			let indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
			nTokenColIndex = indices[1];
		}

		let indexMaxValue = -1;
		let maxValue = -1;
		for(let i = 0; i < nBoardMatrix.length; i++) {
			let cell = nBoardMatrix[i][nTokenColIndex];
			if(cell > maxValue) {
				maxValue = cell;
				indexMaxValue = i;
			}
		}

		if(maxValue > 0) {
			if(!this.direction) {
				return rotateIndicesCounterClockwise(indexMaxValue, nTokenColIndex, nBoardMatrix.length);
			}
			return [indexMaxValue, nTokenColIndex];
		}

		return [-1, -1];
	}
	maxGain = (token, boardMatrix) => {
		// direction: true vertical, false horizontal
		// Get the cell with highest gain with respect to next turn
		let nBoardMatrix = boardMatrix;
		let nTokenColIndex = token.colIndex;
		let nTokenRowIndex = token.rowIndex;

		if(!this.direction) {
			nBoardMatrix = rotateClockwise(nBoardMatrix);
			let indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
			nTokenRowIndex = indices[0];
			nTokenColIndex = indices[1];
		}

		let gainsMatrix = getGainsMatrix(nTokenColIndex, nBoardMatrix);
		let indexBestGain = getBestGain(nTokenRowIndex, nTokenColIndex, gainsMatrix, nBoardMatrix);

		let position = [-1, -1];
		if(indexBestGain >= 0) {
			if(!this.direction) {
				position = rotateIndicesCounterClockwise(indexBestGain, nTokenColIndex, nBoardMatrix.length);
			} else {
				position = [indexBestGain, nTokenColIndex];
			}
		}

		// if(boardMatrix[position[0]][position[1]] <= 0) {
		// 	debugger;
		// }

		return position;
	};
}
class Token {
	constructor(boardSize) {
		// random position
		this.rowIndex = randomInteger(0, boardSize - 1);
		this.colIndex = randomInteger(0, boardSize - 1);
		this.oldRowIndex = this.rowIndex;
		this.oldColIndex = this.colIndex;
	}
	moveTo = (rowIndex, colIndex) => {
		this.oldRowIndex = this.rowIndex;
		this.oldColIndex = this.colIndex;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}
	set(rowIndex, colIndex) {
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.oldRowIndex = this.rowIndex;
		this.oldColIndex = this.colIndex;
	}
}
class Cell {
	// Value is a number between 1 and 9 when the cell
	// has not been taken by a player yet
	// Value is 0 if it is the wildcard
	// Value is -1 if it was taken in a previous turn
	constructor(value, rowIndex, colIndex)
	{
		this.value = value || 0;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}
	update = (value) => {
		this.value = value;
	}
	isSelectable = () => {
		return this.value > 0;
	}
}
class Board {
	constructor(boardSize) {
		this.cells = [];
		for(let i = 0; i < boardSize; i++) {
			let row = [];
			for(let j = 0; j < boardSize; j++) {
				row.push(new Cell(randomInteger(1, 9), i, j));
			}
			this.cells.push(row);
		}
	}
	isCellSelectable = (rowIndex, colIndex) => {
		return this.cells[rowIndex][colIndex].isSelectable();
	};
	update = (token) => {
		// The old position has to be set to -1
		this.cells[token.oldRowIndex][token.oldColIndex].update(-1);
		// The current position has to be set to 0
		this.cells[token.rowIndex][token.colIndex].update(0);
	};
	takeCurrentValue = (token) => {
		return this.cells[token.rowIndex][token.colIndex].value;
	};
	isNextTurnPossible = (player, token) => {
		let tokenRowIndex = token.rowIndex;
		let tokenColIndex = token.colIndex;
		let direction = player.direction;
		if(direction) {
			for(let i = 0; i < Board.size; i++) {
				let cell = this.cells[i][tokenColIndex];
				if(cell.value > 0) return true;
			}
		} else {
			for(let i = 0; i < Board.size; i++) {
				let cell = this.cells[tokenRowIndex][i];
				if(cell.value > 0) return true;
			}
		}
		return false;
	};
	setCellValues = (values) => {
		let size = Math.sqrt(values.length);
		this.cells.forEach((row, rowIndex) => {
			row.forEach((cell, columnIndex) => {
				cell.update(values[rowIndex * size + columnIndex]);
			});
		});
	};
	findTokenPosition = () => {
		for(let i = 0; i < this.cells.length; i++) {
			for(let j = 0; j < this.cells.length; j++) {
				if (this.cells[i][j].value === 0) {
					return [i, j];
				}
			}
		}
		return [-1, -1];
	};
	serialize = () => {
		let values = []
		this.cells.forEach(row => {
			row.forEach(cell => {
				values.push(cell.value);
			});
		});

		return values;
	};
	asMatrix = () => {
		let size = this.cells.length;
		let matrix = [];
		for(let i = 0; i < size; i++) {
			let row = []
			for(let j = 0; j < size; j++) {
				row.push(this.cells[i][j].value);
			}
			matrix.push(row);
		}
		return matrix;
	};
}

Board.size = 9;

function randomInteger(min, max) {
	let r = Math.random();
	return min + Math.round(r * (max - min));
}

function rotateClockwise(matrix) {
	let size = matrix.length;
	let newMatrix = [];
	for(let i = 0; i < size; i++) {
		let row = [];
		for(let j = 0; j < size; j++) {
			row.push(matrix[size - j - 1][i])
		}
		newMatrix.push(row);
	}

	return newMatrix;
}

function rotateCounterClockwise(matrix) {
	let size = matrix.length;
	let newMatrix = [];
	for(let i = 0; i < size; i++) {
		let row = [];
		for(let j = 0; j < size; j++) {
			row.push(matrix[j][size - i - 1])
		}
		newMatrix.push(row);
	}

	return newMatrix;
}

function rotateIndicesClockwise(rowIndex, colIndex, size) {
	return [colIndex, size - rowIndex - 1];
}

function rotateIndicesCounterClockwise(rowIndex, colIndex, size) {
	return [size - colIndex - 1, rowIndex];
}

function getGainsMatrix(tokenColIndex, gameMatrix) {
	// Assume the direction is vertical, so the agent
	// selects over a column
	let size = gameMatrix.length;
	let gainsMatrix = [];
	let nGameMatrix = gameMatrix;
	let nTokenColIndex = tokenColIndex;

	for(let i = 0; i < size; i++) {
		let row = [];
		for(let j = 0; j < size; j++) {
			if(nGameMatrix[i][nTokenColIndex] <= 0) {
				row.push(0);
			} else {
				row.push(nGameMatrix[i][nTokenColIndex] - nGameMatrix[i][j]);
			}
		}
		gainsMatrix.push(row);
	}

	return gainsMatrix;
}

function getBestGain(tokenRowIndex, tokenColIndex, gainsMatrix, boardMatrix) {
	// assume the direction is vertical
	let size = gainsMatrix.length;
	let minGains = [];

	// get the min gains in every row
	for(let i = 0; i < size; i++) {
		let minGain = null;
		for(let j = 0; j < size; j++) {
			if(j === tokenColIndex) { // avoid the column of the token
				continue;
			}
			if(minGain === null || minGain > gainsMatrix[i][j]) {
				minGain = gainsMatrix[i][j];
			}
		}
		minGains.push(minGain);
	}

	// obtain the index of the max gain
	let rowIndex = -1;
	let maxGain = null;
	for(let i = 0; i < size; i++) {
		// The token has to move to other position: tokenRowIndex !== i
		// Also, a cell has to be in the position: boardMatrix[i][tokenColIndex] > 0
		if((maxGain === null || maxGain < minGains[i]) &&
			tokenRowIndex !== i &&
			boardMatrix[i][tokenColIndex] > 0) {
			maxGain = minGains[i];
			rowIndex = i;
		}
	}

	return rowIndex;
}

module.exports = {
	Game: Game,
	Player: Player,
	Agent: Agent,
	Token: Token,
	Cell: Cell,
	Board: Board
};