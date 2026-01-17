const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom');
const styled = require('styled-components');
const { ControlsComp } = require('@components/ControlsComp');
const theme = require('@root/theme');

describe('ControlsComp', () => {
    const baseProps = {
        soundEnabled: true,
        controlsLocked: false,
        toggleSound: jest.fn(),
        reset: jest.fn(),
        'data-testid': 'controls-comp',
    };

    const renderWithTheme = (props = {}) =>
        render(
            React.createElement(
                styled.ThemeProvider || styled.default.ThemeProvider,
                { theme },
                React.createElement(ControlsComp, { ...baseProps, ...props })
            )
        );
    it('should render', () => {
        renderWithTheme();
        expect(screen.getByTestId('controls-comp')).toBeInTheDocument();
        expect(screen.getByTestId('controls-comp-sound-button')).toBeInTheDocument();
        expect(screen.getByTestId('controls-comp-reset-button')).toBeInTheDocument();
    });

    it('should render sound on icon when soundEnabled is true', () => {
        renderWithTheme({ soundEnabled: true });
        expect(screen.getByTestId('volume-on-icon')).toBeInTheDocument();
    });

    it('should render sound off icon when soundEnabled is false', () => {
        renderWithTheme({ soundEnabled: false });
        expect(screen.getByTestId('volume-off-icon')).toBeInTheDocument();
    });

    it('should call reset function on button click', () => {
        renderWithTheme();
        const button = screen.getByTestId('controls-comp-reset-button');
        fireEvent.click(button);
        expect(baseProps.reset).toHaveBeenCalled();
    });

    it('should call toggleSound function on button click', () => {
        renderWithTheme();
        const button = screen.getByTestId('controls-comp-sound-button');
        fireEvent.click(button);
        expect(baseProps.toggleSound).toHaveBeenCalled();
    });
});
