require('../style/style.scss');
require('../style/main.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { LocalStorageManager } = require('./data/LocalStorageManager.js');
const { GameCont } = require('./containers/GameCont.js');
const { initialState, reduce } = require('./reducer.js');
const { PLAYER_DIRECTIONS, TURNS, GAME_CONTINUITY } = require('./model/flags.js');
const { Game } = require('./model/Game.js');

const NumbersApp = () => (
    <GameCont boardSize={9} />
);

const localStorageManager = new LocalStorageManager();
const getGame = () => {
    const previousState = localStorageManager.getGameState();
    const game = new Game(9); // Board size does not matter
    if (previousState !== null) {
        game.updateFromObject(previousState);
    } else {
        game.updateFromObject(initialState);
        localStorageManager.setGameState(game.serialize());
    }

    return game.serialize();
};

const store = createStore(reduce, getGame(), applyMiddleware(thunk));

const saveGame = () => {
    const game = store.getState();
    if (game.snap.turn === TURNS.PLAYER1 || // Player is human
        game.snap.continuity === GAME_CONTINUITY.OVER || // Game is over
        (game.player1.direction === PLAYER_DIRECTIONS.NONE &&
            game.player2.direction === PLAYER_DIRECTIONS.NONE) // Game reset
    ) {
        localStorageManager.setGameState(game);
    }
};

store.subscribe(saveGame);

ReactDOM.render(
    <Provider store={store}>
        <NumbersApp/>
    </Provider>,
    document.getElementById('boardDiv')
);