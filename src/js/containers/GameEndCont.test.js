const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const styled = require('styled-components');
const { GameEndCont } = require('@containers/GameEndCont');
const { initialState } = require('@test/utilsTests.js');
const theme = require('@root/theme');
const { GAME_CONTINUITY } = require('@model/flags');
const types = require('@root/actionTypes');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('GameEndCont', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    function renderEnd() {
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(GameEndCont, { boardSize: 5 })
                    )
                )
            )
        );
    }

    it('should render component', () => {
        renderEnd();
        expect(screen.getByTestId('game-end-comp')).toBeInTheDocument();
    });

    it('should update visibility when game ends', () => {
        const { rerender } = render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(GameEndCont, { boardSize: 5 })
                    )
                )
            )
        );
        expect(screen.getByTestId('game-end-comp').style.display).toEqual('none');

        // Create a new store
        const updatedStore = mockStore({
            ...initialState,
            snap: {
                ...initialState.snap,
                continuity: GAME_CONTINUITY.OVER,
            },
        });

        rerender(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(
                    Provider,
                    { store: updatedStore },
                    React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(GameEndCont, { boardSize: 5 })
                    )
                )
            )
        );

        expect(screen.getByTestId('game-end-comp').style.display).toEqual('flex');
    });

    it('should restart game when reset button is clicked', async () => {
        renderEnd();
        const resetButton = screen.getByTestId('reset-button');
        await resetButton.click();
        const actions = store.getActions();
        expect(actions).toEqual([{ type: types.GAME_RESET, boardSize: 5 }]);
    });
});
