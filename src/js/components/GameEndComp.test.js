const React = require('react');
const { shallow, mount } = require('enzyme');
const styled = require('styled-components');
const { GameEndComp } = require('@components/GameEndComp');
const theme = require('@root/theme');
const ThemeProvider = styled.ThemeProvider || styled.default.ThemeProvider;

const setup = () => {
    const shallowWrapper = shallow(
        <ThemeProvider theme={theme}>
            <GameEndComp style={'overlay'} message={'You won'} />
        </ThemeProvider>
    );
    const mountWrapper = mount(
        <ThemeProvider theme={theme}>
            <GameEndComp style={'overlay'} message={'You won'} />
        </ThemeProvider>
    );

    return {
        shallowWrapper,
        mountWrapper,
    };
};

describe('GameEndComp', () => {
    it('should render (game over, you won)', () => {
        const { shallowWrapper, mountWrapper } = setup();

        expect(shallowWrapper).toMatchSnapshot();

        expect(mountWrapper.find('p').length).toEqual(1);

        mountWrapper.unmount();
    });
});
