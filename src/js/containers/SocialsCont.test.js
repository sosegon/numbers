const React = require('react');
const { Provider } = require('react-redux');
const { mount } = require('enzyme');
const configureStore = require('redux-mock-store').default;
const { SocialsCont } = require('./SocialsCont.js');
const { SocialsComp } = require('../components/SocialsComp.js');
const { TURNS } = require('../model/flags.js');

const {
    initialState
} = require('../../test/utilsTests.js');

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('SocialsCont', () => {
    let wrapper, store, container, component;

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        wrapper = mount(
            <Provider store={store}>
                <SocialsCont />
            </Provider>
        );

        container = wrapper.find(SocialsCont).at(0);
        component = container.find(SocialsComp).at(0);
    });


    it("should render container and component", () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it("should map to component props", () => {
        const expectedPropKeys = [
            'open'
        ];
        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

});