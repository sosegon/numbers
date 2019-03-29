const React = require('react');
const { shallow, mount } = require('enzyme');
const { InfoComp } = require('./InfoComp.js');

const setup = () => {
    const shallowWrapper = shallow(<InfoComp style={'info'} id={'modal-id'}/>);
    const mountWrapper = mount(<InfoComp style={'info'} id={'modal-id'}/>);

    return {
        shallowWrapper,
        mountWrapper
    };
};

describe("InfoComp", () => {
    it("should render the modal", () => {
        const { shallowWrapper, mountWrapper } = setup();

        expect(shallowWrapper).toMatchSnapshot();

        expect(mountWrapper.find('div').length).toBeGreaterThan(0);
        expect(mountWrapper.find('p').length).toBeGreaterThan(0);
        expect(mountWrapper.find('#modal-id')).toBeTruthy();

        mountWrapper.unmount();
    });
});