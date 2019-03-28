const React = require('react');
const { shallow, mount } = require('enzyme');
const { SocialsComp } = require('./SocialsComp.js');

const setup = () => {
    const props = {
        open: jest.fn()
    };

    const shallowWrapper = shallow(<SocialsComp {...props}/>);
    const mountWrapper = mount(<SocialsComp {...props}/>);

    return {
        props,
        shallowWrapper,
        mountWrapper
    };
};

describe("SocialsComp", () => {
    it("should render social buttons", () => {
        const { shallowWrapper, mountWrapper, props } = setup();

        expect(shallowWrapper).toMatchSnapshot();

        expect(mountWrapper.find('img').length).toEqual(3);

        const social = mountWrapper.find('img').at(0);

        social.simulate('click');
        expect(props.open).toHaveBeenCalled();

        mountWrapper.unmount();
    });
});