const React = require('react');
const { shallow, mount } = require('enzyme');
const styled = require('styled-components');
const { CellComp } = require('@components/CellComp');
const { TURNS } = require('@model/flags');
const theme = require('@root/theme');
const ThemeProvider = styled.ThemeProvider || styled.default.ThemeProvider;

const setup = () => {
    const props = {
        onClick: jest.fn(),
        value: 5,
        isSelectable: true,
        turn: TURNS.PLAYER1,
        taken: false,
    };

    const shallowWrapper = shallow(
        <ThemeProvider theme={theme}>
            <CellComp {...props} />
        </ThemeProvider>
    );
    const mountWrapper = mount(
        <ThemeProvider theme={theme}>
            <CellComp {...props} />
        </ThemeProvider>
    );

    return {
        props,
        shallowWrapper,
        mountWrapper,
    };
};

describe('CellComp', () => {
    it('should render', () => {
        const { shallowWrapper } = setup();

        expect(shallowWrapper).toMatchSnapshot();
    });

    it('should call onClick function', () => {
        const { mountWrapper, props } = setup();
        const span = mountWrapper.find('span').at(0);

        span.simulate('click');
        expect(props.onClick).toHaveBeenCalled();

        mountWrapper.unmount();
    });
});
