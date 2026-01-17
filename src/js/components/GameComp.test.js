const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const { Provider } = require('react-redux');
const { GameComp } = require('@components/GameComp');
const { PLAYER_DIRECTIONS } = require('@model/flags');
const { initialState } = require('@test/utilsTests.js');
const theme = require('@root/theme');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('GameComp', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    const baseProps = {
        board: [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
        ],
        player1Direction: PLAYER_DIRECTIONS.HORIZONTAL,
        player2Direction: PLAYER_DIRECTIONS.VERTICAL,
        reset: jest.fn(),
        'data-testid': 'game-comp',
    };

    const renderWithTheme = (props = {}) =>
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(
                    Provider,
                    { store },
                    React.createElement(GameComp, { ...baseProps, ...props })
                )
            )
        );

    it('should render', () => {
        renderWithTheme();
        expect(screen.getByTestId('game-comp')).toBeInTheDocument();
    });

    it('should render the right number of cells', () => {
        renderWithTheme();
        const cells = screen.getAllByTestId('cell-comp');
        expect(cells.length).toBe(25);
    });

    it('should render the right number of scores', () => {
        renderWithTheme();
        const scores = screen.getAllByTestId('score-comp');
        expect(scores.length).toBe(2);
    });

    it('should render game end', () => {
        renderWithTheme();
        const gameEndComp = screen.getByTestId('game-end-comp');
        expect(gameEndComp).toBeInTheDocument();
    });

    it('should render wildcard', () => {
        renderWithTheme();
        const wildCardComp = screen.getByTestId('wild-card-comp');
        expect(wildCardComp).toBeInTheDocument();
    });
});
