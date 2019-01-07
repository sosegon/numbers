const React = require('react');
const { shallow, mount } = require('enzyme');
const { GameEndComp } = require('./GameEndComp.js');

const setup = () => {
    const shallowWrapper = shallow(<GameEndComp style={'overlay'} message={'You won'}/>);
    const mountWrapper = mount(<GameEndComp style={'overlay'} message={'You won'}/>);

    return {
        shallowWrapper,
        mountWrapper
    };
};

describe("GameEndComp", () => {
    it("should render (game over, you won)", () => {
        const { shallowWrapper, mountWrapper } = setup();

        expect(shallowWrapper).toMatchSnapshot();

        expect(mountWrapper.find('p').length).toEqual(1);

        mountWrapper.unmount();
    });
});