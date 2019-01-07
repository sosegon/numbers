const React = require('react');
const { shallow, mount } = require('enzyme');
const { WildCardComp } = require('./WildCardComp.js');

const setup = () => {
    const shallowWrapper = shallow(<WildCardComp />);
    const mountWrapper = mount(<WildCardComp />);

    return {
        shallowWrapper,
        mountWrapper
    };
};

describe("WildCardComp", () => {
    it("should render", () => {
        const { shallowWrapper, mountWrapper } = setup();

        expect(shallowWrapper).toMatchSnapshot();

        expect(mountWrapper.find('span').length).toEqual(1);

        mountWrapper.unmount();
    });
});