const React = require('react');
const { shallow, mount } = require('enzyme');
const { CellComp } = require('./CellComp.js');

const setup = () => {
    const props = {
        onClick: jest.fn()
    };

    const shallowWrapper = shallow(<CellComp {...props} />);
    const mountWrapper = mount(<CellComp {...props} />);

    return {
        props,
        shallowWrapper,
        mountWrapper
    };
};

describe("CellComp", () => {
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