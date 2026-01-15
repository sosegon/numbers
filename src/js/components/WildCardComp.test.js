const React = require('react');
const { render, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { WildCardComp } = require('@components/WildCardComp');
const theme = require('@root/theme');

describe('WildCardComp', () => {
    const props = {
        rowIndex: 0,
        colIndex: 0,
        'data-testid': 'wildcard-comp',
    };

    it('should render', () => {
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(WildCardComp, props)
            )
        );
        expect(screen.getByTestId('wildcard-comp')).toBeInTheDocument();
    });
});
