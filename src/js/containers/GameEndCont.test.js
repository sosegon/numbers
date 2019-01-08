const React = require('react');
const { Provider } = require('react-redux');
const { mount } = require('enzyme');
const configureStore = require('redux-mock-store').default;
const { GameEndCont } = require('./GameEndCont.js');
const { GameEndComp } = require('../components/GameEndComp.js');
const { TURNS } = require('../model/constants.js');

const {
    initialState
} = require('../../test/utilsTests.js');

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('GameEndCont', () => {
    let wrapper, store, container, component1, component2;

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        wrapper = mount(
            <Provider store={store}>
                <GameEndCont />
            </Provider>
        );

        container = wrapper.find(GameEndCont).at(0);
        component = container.find(GameEndComp).at(0);
    });


    it("should render container and component", () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it("should map to component props", () => {
        const expectedPropKeys = [
            'style',
            'message'
        ];
        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it("should have props with correct values", () => {
        expect(component.props().style).toEqual('invisible');
        expect(component.props().message).toEqual('Draw');
    });
});