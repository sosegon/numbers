const React = require('react');
const { Provider } = require('react-redux');
const { mount } = require('enzyme');
const configureStore = require('redux-mock-store').default;
const { ScoreCont } = require('./ScoreCont.js');
const { ScoreComp } = require('../components/ScoreComp.js');
const { TURNS } = require('../model/constants.js');

const {
    initialState
} = require('../../test/utilsTests.js');

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('ScoreCont', () => {
    let wrapper, store, container1, container2, component1, component2;

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        wrapper = mount(
            <Provider store={store}>
                <ScoreCont playerName={TURNS.PLAYER1}/>
                <ScoreCont playerName={TURNS.PLAYER2}/>
            </Provider>
        );

        container1 = wrapper.find(ScoreCont).at(0);
        container2 = wrapper.find(ScoreCont).at(1);

        component1 = container1.find(ScoreComp).at(0);
        component2 = container2.find(ScoreComp).at(0);
    });


    it("should render container and component", () => {
        expect(container1.length).toBeTruthy();
        expect(container2.length).toBeTruthy();

        expect(component1.length).toBeTruthy();
        expect(component2.length).toBeTruthy();
    });

    it("should map to component props", () => {
        const expectedPropKeys = [
            'name',
            'score'
        ];
        expect(Object.keys(component1.props())).toEqual(expect.arrayContaining(expectedPropKeys));
        expect(Object.keys(component2.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it("should map to container props", () => {
        const expectedPropKeys = [
            'playerName'
        ];
        expect(Object.keys(container1.props())).toEqual(expect.arrayContaining(expectedPropKeys));
        expect(Object.keys(container2.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it("should have props with correct values", () => {
        expect(component1.props().name).toEqual('You');
        expect(component1.props().score).toEqual(0);

        expect(component2.props().name).toEqual('Agent');
        expect(component2.props().score).toEqual(0);
    });
});