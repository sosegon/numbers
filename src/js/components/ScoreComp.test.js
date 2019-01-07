const React = require('react');
const { shallow, mount } = require('enzyme');
const { ScoreComp } = require('./ScoreComp.js');

const setup = () => {
    const shallowWrapper = shallow(<ScoreComp name={'you'} score={0}/>);
    const mountWrapper = mount(<ScoreComp name={'agent'} score={0}/>);

    return {
        shallowWrapper,
        mountWrapper
    };
};

describe("ScoreComp", () => {
    it("should render", () => {
        const { shallowWrapper, mountWrapper } = setup();

        expect(shallowWrapper).toMatchSnapshot();

        expect(mountWrapper.find('span').length).toEqual(2);

        mountWrapper.unmount();
    });
});