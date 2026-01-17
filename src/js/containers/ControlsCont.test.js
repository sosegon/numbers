const React = require('react');
const { render, screen, fireEvent, act } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const styled = require('styled-components');
const { ControlsCont } = require('@containers/ControlsCont');
const { initialState } = require('@test/utilsTests.js');
const { resetGame } = require('@reducers/gameActions');
const { toggleSound } = require('@reducers/settingsActions');
const theme = require('@root/theme');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ControlsCont', () => {
    let store;
    beforeEach(() => {
        jest.resetAllMocks();
        store = mockStore(initialState);
    });

    function renderControls() {
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
                        React.createElement(ControlsCont, {
                            'data-testid': 'controls-comp',
                            boardSize: 5,
                        })
                    )
                )
            )
        );
    }
    it('should render component', () => {
        renderControls();
        expect(screen.getByTestId('controls-comp')).toBeInTheDocument();
    });
    it('should render reset button', () => {
        renderControls();
        expect(screen.getByTestId('controls-comp-reset-button')).toBeInTheDocument();
    });
    it('should dispatch resetGame action when reset button is clicked', async () => {
        renderControls();
        await act(async () => {
            fireEvent.click(screen.getByTestId('controls-comp-reset-button'));
        });
        expect(store.getActions()).toEqual([resetGame(5)]);
    });
    it('should dispatch toggleSound action when sound button is clicked', async () => {
        renderControls();
        await act(async () => {
            fireEvent.click(screen.getByTestId('controls-comp-sound-button'));
        });
        expect(store.getActions()).toEqual([toggleSound()]);
    });
});
