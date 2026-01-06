const React = require('react');
const { mount } = require('enzyme');
const { Provider } = require('react-redux');
const configureStore = require('redux-mock-store').default;
const { GameComp } = require('@components/GameComp');
const { GameCont } = require('@containers/GameCont');
const { resetGame } = require('@root/actions');
const { vectorToMatrix } = require('@model/utils');
const { initialState } = require('@test/utilsTests');

const mockStore = configureStore();

describe('CellCont', () => {
    let wrapper, store, container, component;
    const boardSize = 9;

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        wrapper = mount(
            <Provider store={store}>
                <GameCont boardSize={boardSize} />
            </Provider>
        );

        container = wrapper.find(GameCont).at(0);
        component = container.find(GameComp).at(0);
    });

    it('should render container and component', () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it('should map to container props', () => {
        const expectedPropKeys = ['boardSize'];
        expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it('should map to component props', () => {
        const expectedPropKeys = ['reset', 'board'];
        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it('should have props with correct values', () => {
        const expected = vectorToMatrix(initialState.board);
        expect(component.props().board).toEqual(expected);
    });

    it('should dispatch resetGame action when clicked', () => {
        expect(store.getActions()).toEqual([]);

        component.find('img').at(0).simulate('click');
        expect(store.getActions()).toEqual([resetGame(boardSize)]);
        store.clearActions();
    });
});
