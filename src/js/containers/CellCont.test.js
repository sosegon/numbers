const React = require('react');
const { render, screen, fireEvent, act } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const styled = require('styled-components');
const { CellCont } = require('@containers/CellCont');
const { moveToken } = require('@reducers/gameActions');
const {
    initialState,
    verticalPosition,
    horizontalPosition,
    otherPosition,
    verticalPositionHid,
    horizontalPositionHid,
    otherPositionHid,
} = require('@test/utilsTests.js');
const theme = require('@root/theme');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CellCont', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    function renderCells() {
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
                        React.createElement(CellCont, verticalPosition),
                        React.createElement(CellCont, horizontalPosition),
                        React.createElement(CellCont, otherPosition),
                        React.createElement(CellCont, verticalPositionHid),
                        React.createElement(CellCont, horizontalPositionHid),
                        React.createElement(CellCont, otherPositionHid)
                    )
                )
            )
        );
    }

    it('should render component', () => {
        renderCells();
        expect(screen.getByTestId('cell-vertical')).toBeInTheDocument();
        expect(screen.getByTestId('cell-horizontal')).toBeInTheDocument();
        expect(screen.getByTestId('cell-other')).toBeInTheDocument();
        expect(screen.getByTestId('cell-vertical-hid')).toBeInTheDocument();
        expect(screen.getByTestId('cell-horizontal-hid')).toBeInTheDocument();
        expect(screen.getByTestId('cell-other-hid')).toBeInTheDocument();
    });

    it('should render given values', () => {
        renderCells();
        expect(screen.getByTestId('cell-vertical')).toHaveTextContent(
            verticalPosition.value.toString()
        );
        expect(screen.getByTestId('cell-horizontal')).toHaveTextContent(
            horizontalPosition.value.toString()
        );
        expect(screen.getByTestId('cell-other')).toHaveTextContent(otherPosition.value.toString());
        expect(screen.getByTestId('cell-vertical-hid')).toHaveTextContent('');
        expect(screen.getByTestId('cell-horizontal-hid')).toHaveTextContent('');
        expect(screen.getByTestId('cell-other-hid')).toHaveTextContent('');
    });

    it('should dispatch moveToken action when clicked', async () => {
        renderCells();
        await act(async () => {
            fireEvent.click(screen.getByTestId('cell-vertical'));
        });
        expect(store.getActions()).toEqual([moveToken(0, 3)]);
        store.clearActions();

        await act(async () => {
            fireEvent.click(screen.getByTestId('cell-horizontal'));
        });
        expect(store.getActions()).toEqual([moveToken(3, 0)]);
        store.clearActions();

        await act(async () => {
            fireEvent.click(screen.getByTestId('cell-other'));
        });
        expect(store.getActions()).toEqual([]);
        store.clearActions();

        // Hidden cells should not be clickable
        await act(async () => {
            fireEvent.click(screen.getByTestId('cell-vertical-hid'));
        });
        expect(store.getActions()).toEqual([]);
        store.clearActions();

        await act(async () => {
            fireEvent.click(screen.getByTestId('cell-horizontal-hid'));
        });
        expect(store.getActions()).toEqual([]);
        store.clearActions();

        await act(async () => {
            fireEvent.click(screen.getByTestId('cell-other-hid'));
        });
        expect(store.getActions()).toEqual([]);
        store.clearActions();
    });
});
