const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { CellEffectsComp } = require('@components/CellEffectsComp');
const { TURNS } = require('@model/flags');
const theme = require('@root/theme');

describe('CellEffectsComp', () => {
    const props = {
        rowIndex: 0,
        colIndex: 0,
        turn: TURNS.PLAYER1,
        soundEnabled: false,
        soundLocked: false,
        'data-testid': 'cell-effects-comp',
    };

    it('should render', () => {
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(CellEffectsComp, props)
            )
        );
        expect(screen.getByTestId('cell-effects-comp')).toBeInTheDocument();

        for (let i = 0; i < 8; i++) {
            expect(screen.getByTestId(`cell-effects-comp-particle-${i}`)).toBeInTheDocument();
            expect(screen.getByTestId(`cell-effects-comp-particle-${i}`)).toHaveStyle(
                `background-color: ${theme.colors.primary};`
            );
        }
    });
});
