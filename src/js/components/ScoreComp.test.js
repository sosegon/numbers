const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { ScoreComp } = require('@components/ScoreComp');
const theme = require('@root/theme');

describe('ScoreComp', () => {
    const baseProps = {
        score: 10,
        name: 'AI Core',
        direction: 'rows',
        'data-testid': 'score-comp',
    };

    const renderWithTheme = (props = {}) =>
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(ScoreComp, { ...baseProps, ...props })
            )
        );

    it('should render', () => {
        renderWithTheme();
        expect(screen.getByTestId('score-comp')).toBeInTheDocument();
    });

    it('should render the correct score', () => {
        renderWithTheme({ score: 10 });
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should render the correct name', () => {
        renderWithTheme({ name: 'AI Core' });
        expect(screen.getByText('// AI Core //')).toBeInTheDocument();
    });

    it('should render the correct direction', () => {
        renderWithTheme({ direction: 'rows' });
        expect(screen.getByText('> rows')).toBeInTheDocument();
    });

    it('should update score when prop changes', async () => {
        const { rerender } = renderWithTheme({ score: 5 });
        expect(screen.getByText('05')).toBeInTheDocument();
        rerender(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(ScoreComp, { ...baseProps, score: 20 })
            )
        );
        await waitFor(() => expect(screen.getByText('20')).toBeInTheDocument());
    });
});
