const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const styled = require('styled-components');
const { ScoreCont } = require('@containers/ScoreCont');
const { initialState } = require('@test/utilsTests.js');
const theme = require('@root/theme');
const { PLAYER_DIRECTIONS, TURNS } = require('@model/flags');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ScoreCont', () => {
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
                    React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(ScoreCont, {
                            playerName: TURNS.PLAYER1,
                            direction: PLAYER_DIRECTIONS.HORIZONTAL,
                            'data-testid': 'score-card',
                        })
                    )
                )
            )
        );
    }

    it('should render component', () => {
        renderScore();
        expect(screen.getByTestId('score-card')).toBeInTheDocument();
    });

    it('should update score when store changes', async () => {
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
                        React.createElement(ScoreCont, {
                            playerName: TURNS.PLAYER1,
                            direction: PLAYER_DIRECTIONS.HORIZONTAL,
                            'data-testid': 'score-card',
                        })
                    )
                )
            )
        );
        expect(screen.getByTestId('score-card-value').textContent).toBe('00');

        // Create a new store with updated score
        const updatedStore = mockStore({
            ...initialState,
            player1: {
                ...initialState[TURNS.PLAYER1],
                score: 10,
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
                        React.createElement(ScoreCont, {
                            playerName: TURNS.PLAYER1,
                            direction: PLAYER_DIRECTIONS.HORIZONTAL,
                            'data-testid': 'score-card',
                        })
                    )
                )
            )
        );

        await waitFor(() => expect(screen.getByTestId('score-card-value').textContent).toBe('10'));
    });
});
