const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { GameEndComp } = require('@components/GameEndComp');
const { GAME_RESULT } = require('@model/flags');
const theme = require('@root/theme');

describe('GameEndComp', () => {
    const baseProps = {
        isOver: true,
        result: GAME_RESULT.WON,
        soundEnabled: true,
        soundLocked: false,
        reset: jest.fn(),
        'data-testid': 'game-end-comp',
    };

    const renderWithTheme = (props = {}) =>
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(GameEndComp, { ...baseProps, ...props })
            )
        );

    it('should render', () => {
        renderWithTheme();
        expect(screen.getByTestId('game-end-comp')).toBeInTheDocument();
    });

    it('should render the correct message', () => {
        renderWithTheme({ result: GAME_RESULT.WON });
        expect(screen.getByText('You Won!')).toBeInTheDocument();
    });

    it('should call reset function on button click', () => {
        renderWithTheme();
        const button = screen.getByText('RESTART GAME');
        fireEvent.click(button);
        expect(baseProps.reset).toHaveBeenCalled();
    });
});
