const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { CellComp } = require('@components/CellComp');
const { TURNS } = require('@model/flags');
const theme = require('@root/theme');

describe('CellComp', () => {
    const baseProps = {
        onClick: jest.fn(),
        value: 5,
        isSelectable: true,
        turn: TURNS.PLAYER1,
        taken: false,
        'data-testid': 'cell-comp',
    };

    const renderWithTheme = (props = {}) =>
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(CellComp, { ...baseProps, ...props })
            )
        );

    it('should render', () => {
        renderWithTheme();
        expect(screen.getByTestId('cell-comp')).toBeInTheDocument();
    });

    it('should call onClick function', () => {
        renderWithTheme({ value: 10 });
        const cell = screen.getByText('10');
        fireEvent.click(cell);
        expect(baseProps.onClick).toHaveBeenCalled();
    });
});
