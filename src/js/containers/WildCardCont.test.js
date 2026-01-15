const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const styled = require('styled-components');
const { WildCardCont } = require('@containers/WildCardCont');
const { initialState } = require('@test/utilsTests.js');
const theme = require('@root/theme');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('WildCardCont', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    function renderWildCard() {
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
                        React.createElement(WildCardCont, {
                            'data-testid': 'wild-card',
                        })
                    )
                )
            )
        );
    }

    it('should render component', () => {
        renderWildCard();
        expect(screen.getByTestId('wild-card')).toBeInTheDocument();
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
                        React.createElement(WildCardCont, {
                            'data-testid': 'wild-card',
                        })
                    )
                )
            )
        );
        const wildCard = screen.getByTestId('wild-card');
        let top =
            store.getState().token.rowIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding;
        let left =
            store.getState().token.colIndex * (theme.sizes.cellSize + 3 * theme.sizes.cellMargin) +
            theme.sizes.boardPadding;
        expect(wildCard.style.top).toEqual(`${top}px`);
        expect(wildCard.style.left).toEqual(`${left}px`);

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
                        React.createElement(WildCardCont, {
                            'data-testid': 'wild-card',
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
        expect(wildCard.style.top).toEqual(`${top}px`);
        expect(wildCard.style.left).toEqual(`${left}px`);
    });
});
