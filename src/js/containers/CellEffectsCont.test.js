const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const styled = require('styled-components');
const { CellEffectsCont } = require('@containers/CellEffectsCont');
const { initialState } = require('@test/utilsTests.js');
const theme = require('@root/theme');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CellEffectsCont', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    function rendercellEffects() {
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
                        React.createElement(CellEffectsCont, {
                            'data-testid': 'cell-effects',
                        })
                    )
                )
            )
        );
    }

    it('should render component', () => {
        rendercellEffects();
        expect(screen.getByTestId('cell-effects')).toBeInTheDocument();
    });

    it('should render in new position', () => {
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
                        React.createElement(CellEffectsCont, {
                            'data-testid': 'cell-effects',
                        })
                    )
                )
            )
        );
        const cellEffects = screen.getByTestId('cell-effects');
        let top =
            store.getState().token.rowIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding;
        let left =
            store.getState().token.colIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding;
        expect(cellEffects.style.top).toEqual(`${top}px`);
        expect(cellEffects.style.left).toEqual(`${left}px`);

        // Update store with new position
        const updatedStore = mockStore({
            ...initialState,
            token: {
                ...initialState.token,
                rowIndex: 4,
                colIndex: 1,
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
                        React.createElement(CellEffectsCont, {
                            'data-testid': 'cell-effects',
                        })
                    )
                )
            )
        );

        top =
            updatedStore.getState().token.rowIndex *
                (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding;
        left =
            updatedStore.getState().token.colIndex *
                (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding;
        expect(cellEffects.style.top).toEqual(`${top}px`);
        expect(cellEffects.style.left).toEqual(`${left}px`);
    });
});
