require('@style/main.css');
const ReactDOM = require('react-dom/client');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const styled = require('styled-components');
const { LocalStorageManager } = require('@data/LocalStorageManager');
const { GameCont } = require('@containers/GameCont');
const { gameInitialState, settingsInitialState, rootReducer } = require('@reducers');
const { PLAYER_DIRECTIONS, TURNS, GAME_CONTINUITY } = require('@model/flags');
const { Game } = require('@model/Game');
const theme = require('@root/theme');

const ThemeProvider = styled.ThemeProvider || styled.default.ThemeProvider;
const NumbersApp = () => (
    <ThemeProvider theme={theme}>
        <GameCont boardSize={9} />
    </ThemeProvider>
);

const localStorageManager = new LocalStorageManager();
const getGame = () => {
    const previousState = localStorageManager.getGameState();
    const game = new Game(9); // Board size does not matter
    if (previousState !== null) {
        game.updateFromObject(previousState);
    } else {
        game.updateFromObject(gameInitialState);
        localStorageManager.setGameState(game.serialize());
    }

    return game.serialize();
};

console.log(settingsInitialState, gameInitialState);

const store = createStore(
    rootReducer,
    { game: getGame(), settings: settingsInitialState },
    applyMiddleware(thunk)
);

const saveGame = () => {
    const game = store.getState().game;
    if (
        game.snap.turn === TURNS.PLAYER1 || // Player is human
        game.snap.continuity === GAME_CONTINUITY.OVER || // Game is over
        (game.player1.direction === PLAYER_DIRECTIONS.NONE &&
            game.player2.direction === PLAYER_DIRECTIONS.NONE) // Game reset
    ) {
        localStorageManager.setGameState(game);
    }
};

store.subscribe(saveGame);

const container = document.getElementById('board-game');
const root = ReactDOM.createRoot(container);
root.render(
    <Provider store={store}>
        <NumbersApp />
    </Provider>
);
