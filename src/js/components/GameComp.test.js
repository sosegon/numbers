const React = require('react');
const { Provider } = require('react-redux');
const { shallow, mount } = require('enzyme');
const configureStore = require('redux-mock-store').default;
const { GameComp } = require('@components/GameComp');

const { initialState } = require('@test/utilsTests.js');

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('GameComp', () => {
    let shallowWrapper, mountWrapper, store;

    const props = {
        reset: jest.fn(),
        board: [
            [2, 3, 4, 7, 8],
            [1, -1, 3, -1, 6],
            [2, 7, 6, 4, 1],
            [5, -1, 9, 0, 2],
            [8, 7, 9, 2, 1],
        ],
    };

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        shallowWrapper = shallow(<GameComp {...props} />);
        mountWrapper = mount(
            <Provider store={store}>
                <GameComp {...props} />
            </Provider>
        );
    });

    it('should render', () => {
        expect(shallowWrapper).toMatchSnapshot();
        expect(mountWrapper.find('img').length).toBeGreaterThan(0);
        expect(mountWrapper.find('WildCardComp').length).toEqual(1);
        expect(mountWrapper.find('CellComp').length).toEqual(25);
        expect(mountWrapper.find('GameEndComp').length).toEqual(1);
        expect(mountWrapper.find('ScoreComp').length).toEqual(2);
    });
});
