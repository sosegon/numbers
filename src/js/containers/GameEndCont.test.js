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

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('GameEndCont', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    function renderScore() {
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(React.Fragment, null, React.createElement(GameEndCont))
                )
            )
        );
    }

    it('should render component', () => {
        renderScore();
        expect(screen.getByTestId('game-end-comp')).toBeInTheDocument();
    });

    it('should update score when store changes', () => {
        const { rerender } = render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(React.Fragment, null, React.createElement(GameEndCont))
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
                    React.createElement(React.Fragment, null, React.createElement(GameEndCont))
                )
            )
        );

        expect(screen.getByTestId('game-end-comp').style.display).toEqual('flex');
    });
});
