const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { GameEndComp } = require('@components/GameEndComp');
const theme = require('@root/theme');

describe('GameEndComp', () => {
    const baseProps = {
        isOver: true,
        message: 'Game Over',
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
        renderWithTheme({ message: 'Game Over' });
        expect(screen.getByText('Game Over')).toBeInTheDocument();
    });

    it('should call reset function on button click', () => {
        renderWithTheme();
        const button = screen.getByText('RESTART GAME');
        fireEvent.click(button);
        expect(baseProps.reset).toHaveBeenCalled();
    });
});
